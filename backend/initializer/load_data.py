import csv
import json
import requests
import time

ELASTICSEARCH_URL = 'http://elasticsearch:9200'
INDEX_NAME = 'movies'
CSV_FILE = 'movies_metadata.csv'
BULK_SIZE = 1000  # Number of documents to batch for bulk upload

def index_exists():
    """Check if the Elasticsearch index already exists."""
    response = requests.head(f"{ELASTICSEARCH_URL}/{INDEX_NAME}")
    return response.status_code == 200

def create_index():
    """Create the Elasticsearch index with settings and mappings."""
    if index_exists():
        print(f"Index {INDEX_NAME} already exists")
        return

    print(f"Creating index {INDEX_NAME}")
    settings = {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 0
        },
        "mappings": {
            "properties": {
                "title": {"type": "text"},
                "overview": {"type": "text"},
                "genres": {"type": "text"},
            }
        }
    }
    response = requests.put(f"{ELASTICSEARCH_URL}/{INDEX_NAME}", headers={"Content-Type": "application/json"}, data=json.dumps(settings))
    if response.status_code == 200:
        print(f"Index {INDEX_NAME} created successfully")
    else:
        print(f"Failed to create index {INDEX_NAME}: {response.content}")

def bulk_load_data(docs):
    """Bulk upload documents to Elasticsearch."""
    if not docs:
        return

    bulk_data = ""
    for doc in docs:
        action = {
            "index": { "_index": INDEX_NAME }
        }
        bulk_data += json.dumps(action) + "\n" + json.dumps(doc) + "\n"

    response = requests.post(f"{ELASTICSEARCH_URL}/_bulk", headers={"Content-Type": "application/json"}, data=bulk_data)
    if response.status_code == 200:
        print(f"Bulk upload successful")
    else:
        print(f"Failed to bulk upload documents: {response.content}")

def load_data():
    """Load data from CSV into Elasticsearch using bulk upload."""
    print("Loading data into Elasticsearch")
    docs = []
    with open(CSV_FILE, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            doc = {
                "id": int(row["id"]),
                "title": str(row["title"]),
                "overview": str(row["overview"]),
                "release_date": str(row["release_date"]),
                "genres": str(row["genres"]),
                "popularity": float(row["popularity"]),
                "vote_average": float(row["vote_average"]),
                "vote_count": int(row["vote_count"])
            }
            docs.append(doc)

            # Bulk upload in batches
            if len(docs) >= BULK_SIZE:
                bulk_load_data(docs)
                docs = []

    # Upload remaining documents
    if docs:
        bulk_load_data(docs)

if __name__ == "__main__":
    # Wait for Elasticsearch to be ready
    time.sleep(30)
    create_index()
    load_data()
