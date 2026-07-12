#!/usr/bin/env python3
"""
Semantic search proof-of-concept using OpenAI embeddings.

Concepts demonstrated:
  - Embeddings: converting text into a list of numbers that captures meaning
  - Cosine similarity: measuring how "close" two embeddings are in meaning
  - Semantic search: finding poems that match a description, not just keywords
"""

import os
import numpy as np
import psycopg2
from openai import OpenAI
from dotenv import load_dotenv

# ─── Configuration ────────────────────────────────────────────────────────────

load_dotenv(
    dotenv_path=os.path.join(os.path.dirname(__file__), "../.env"), override=True
)

QUERY = "中秋节思念亲人"
SAMPLE_SIZE = 10

# ─── Step 1: Pull poems from the database ─────────────────────────────────────


def fetch_poems():
    """Fetch a sample of poems with their poet names."""
    # Strip Prisma-specific ?schema= param — psycopg2 doesn't understand it
    db_url = os.getenv("DATABASE_URL").split("?")[0]
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()

    cur.execute(
        """
        SELECT p.id, p.title, p.content, p.translation, po.name AS poet
        FROM "Poem" p
        JOIN "Poet" po ON p."poetId" = po.id
        ORDER BY p.stars DESC
        LIMIT %s
    """,
        (SAMPLE_SIZE,),
    )

    rows = cur.fetchall()
    cur.close()
    conn.close()

    return [
        {
            "id": row[0],
            "title": row[1],
            "content": row[2],
            "translation": row[3],
            "poet": row[4],
        }
        for row in rows
    ]


# ─── Step 2: Get embeddings from OpenAI ───────────────────────────────────────
#
# An embedding is a list of ~1500 numbers (a "vector") that represents the
# meaning of a piece of text. Texts with similar meanings produce vectors
# that point in similar directions in that high-dimensional space.
#
# We embed both the poems and the query using the same model so they live
# in the same space and can be compared.


def get_embedding(client, text):
    """Request an embedding vector for a single piece of text."""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text,
    )
    # The API returns a list of numbers — one embedding per input
    return np.array(response.data[0].embedding)


# ─── Step 3: Compute cosine similarity ────────────────────────────────────────
#
# Cosine similarity measures the angle between two vectors.
# - Score of 1.0  → identical direction → very similar meaning
# - Score of 0.0  → perpendicular       → unrelated
# - Score of -1.0 → opposite direction  → opposite meaning
#
# Formula: similarity = (A · B) / (|A| × |B|)
#   where · is the dot product and |x| is the vector's length (norm)
#
# OpenAI embeddings are already normalized (length = 1), so |A| and |B|
# are both 1, and the formula simplifies to just the dot product.
# We use the full formula here so the concept is clear.


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


# ─── Main ──────────────────────────────────────────────────────────────────────


def main():
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # Step 1: fetch poems
    print(f"Fetching {SAMPLE_SIZE} poems from the database...")
    poems = fetch_poems()
    print(f"  Got {len(poems)} poems\n")

    # Step 2: embed each poem
    # We combine title + poet + content so the embedding captures all of it
    print("Getting embeddings for each poem...")
    for poem in poems:
        poem_text = (
            f"{poem['title']} {poem['poet']}\n{poem['content']}\n{poem['translation']}"
        )
        poem["embedding"] = get_embedding(client, poem_text)
        print(f"  ✓ {poem['title']}")

    # Step 3: embed the query
    print(f'\nQuery: "{QUERY}"')
    print("Getting embedding for query...")
    query_embedding = get_embedding(client, QUERY)

    # Step 4: compute cosine similarity between query and each poem
    print("\nComputing similarity scores...")
    for poem in poems:
        poem["score"] = cosine_similarity(query_embedding, poem["embedding"])

    # Step 5: rank and print results
    ranked = sorted(poems, key=lambda p: p["score"], reverse=True)

    print("\n" + "─" * 60)
    print(f'Results ranked by semantic similarity to:\n"{QUERY}"')
    print("─" * 60)

    for i, poem in enumerate(ranked, 1):
        print(f"\n#{i}  score: {poem['score']:.4f}")
        print(f"    {poem['title']} — {poem['poet']}")
        # Print just the first line of content for context
        first_line = poem["content"].split("\n")[0]
        print(f"    {first_line}")


if __name__ == "__main__":
    main()
