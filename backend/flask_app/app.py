from flask import Flask, request, jsonify
from elasticsearch import Elasticsearch, exceptions

app = Flask(__name__)

# Initialize the Elasticsearch client with scheme, host, and port
es = Elasticsearch(
    [{'scheme': 'http', 'host': 'elasticsearch', 'port': 9200}]
)

es._verified_elasticsearch = True

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    
    # Handle the case where no query is provided
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400

    try:
        # Perform the search
        response = es.search(index="movies", body={
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["title", "overview", "genres"]
                }
            }
        })
        
        # Extract relevant data from the response
        hits = response['hits']['hits']
        return jsonify(hits)
        
    except exceptions.RequestError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        app.logger.error("An error occurred: %s", str(e))
        return jsonify({"error": "An error occurred"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
