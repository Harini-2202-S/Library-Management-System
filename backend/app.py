from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import csv


app = Flask(__name__)
CORS(app)  

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Backend is live and running!"})



# MySQL connection setup
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="Monesha",  
        password="SriRam33Lak$",  
        database="vit"  
    )

# API to fetch books from CSV
@app.route('/books', methods=['GET'])
def get_books():
    books = []
    try:
        with open("books.csv", newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                books.append({
                    "isbn13": row.get("isbn13", ""), 
                    "isbn10": row.get("isbn10", ""),
                    "title": row.get("title", "No Title Available"),
                    "subtitle": row.get("subtitle", ""),
                    "authors": row.get("authors", "Unknown"),
                    "categories": row.get("categories", "Uncategorized"),
                    "thumbnail": row.get("thumbnail", ""),
                    "description": row.get("description", "No description available."),
                    "published_year": row.get("published_year", "Unknown"),
                    "average_rating": float(row.get("average_rating", 0)), 
                    "num_pages": int(row.get("num_pages", 0)),  
                    "ratings_count": int(row.get("ratings_count", 0)), 
                })
                if len(books) >= 48: 
                    break
        return jsonify(books), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add_to_wishlist', methods=['POST'])
def add_to_wishlist():
    data = request.get_json()
    user_id = data['user_id']
    isbn13 = data['isbn13']
    title = data['title']
    subtitle = data['subtitle']
    authors = data['authors']
    categories = data['categories']
    thumbnail = data['thumbnail']
    description = data['description']
    published_year = data['published_year']
    average_rating = data['average_rating']
    num_pages = data['num_pages']
    ratings_count = data['ratings_count']
    
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        
        cursor.execute('''
            INSERT INTO wishlist (user_id, isbn13, title, subtitle, authors, categories, 
                                  thumbnail, description, published_year, average_rating, 
                                  num_pages, ratings_count)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (user_id, isbn13, title, subtitle, authors, categories, thumbnail, description, 
              published_year, average_rating, num_pages, ratings_count))
        conn.commit()
        
        return jsonify({"message": "Book added to wishlist"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/get_wishlist/<int:user_id>', methods=['GET'])
def get_wishlist(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            SELECT * FROM wishlist WHERE user_id = %s
        ''', (user_id,))
        wishlist_items = cursor.fetchall()

        wishlist = []
        for item in wishlist_items:
            wishlist.append({
                "isbn13": item[2],
                "title": item[3],
                "subtitle": item[4],
                "authors": item[5],
                "categories": item[6],
                "thumbnail": item[7],
                "description": item[8],
                "published_year": item[9],
                "average_rating": item[10],
                "num_pages": item[11],
                "ratings_count": item[12],
            })

        return jsonify(wishlist), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# Remove book from wishlist
@app.route('/remove_from_wishlist/<int:user_id>', methods=['DELETE'])
def remove_from_wishlist(user_id):
    try:
        data = request.get_json()
        isbn13 = data.get("isbn13")

        # Remove the book from the wishlist in the database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            DELETE FROM wishlist
            WHERE user_id = %s AND isbn13 = %s
        ''', (user_id, isbn13))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Book removed from wishlist"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
import urllib.parse
@app.route('/get_book_by_title/<title>', methods=['GET'])
def get_book_by_title(title):
    try:
        # Decode the title from URL encoding, handling special characters
        decoded_title = urllib.parse.unquote(title)
        
        # Initialize a variable to store the found book
        found_book = None

        # Open the CSV file and search for the book by title
        with open("books.csv", newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row.get("title", "").lower() == decoded_title.lower():
                    found_book = {
                        "isbn13": row.get("isbn13", ""), 
                        "isbn10": row.get("isbn10", ""),
                        "title": row.get("title", "No Title Available"),
                        "subtitle": row.get("subtitle", ""),
                        "authors": row.get("authors", "Unknown"),
                        "categories": row.get("categories", "Uncategorized"),
                        "thumbnail": row.get("thumbnail", ""),
                        "description": row.get("description", "No description available."),
                        "published_year": row.get("published_year", "Unknown"),
                        "average_rating": float(row.get("average_rating", 0)),
                        "num_pages": int(row.get("num_pages", 0)),  
                        "ratings_count": int(row.get("ratings_count", 0)),  
                    }
                    break
        
        # If the book was found, return it, otherwise return a 404 error
        if found_book:
            return jsonify(found_book), 200
        else:
            return jsonify({"error": "Book not found"}), 404
    
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
#Sign-up API to register a new user (without password hashing)
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Extract user details from request
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Please provide all the required fields (username, email, password)."}), 400

    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the email already exists
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()
    if existing_user:
        return jsonify({"error": "Email already registered."}), 400

    # Insert the new user into the database
    try:
        cursor.execute("""
            INSERT INTO users (username, email, password)
            VALUES (%s, %s, %s)
        """, (username, email, password))
        conn.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": f"Error: {err}"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/add_comment', methods=['POST'])
def add_comment():
    data = request.get_json()

    # Extract data from the request
    user_id = data.get('user_id')
    book_title = data.get('title')  
    comment = data.get('comment')

    # Validate the input
    if not user_id or not book_title or not comment:
        return jsonify({"error": "Missing required fields: user_id, title, comment"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Insert the comment into the comments table
        cursor.execute('''
            INSERT INTO comments (user_id, book_title, comment)
            VALUES (%s, %s, %s)
        ''', (user_id, book_title, comment))
        conn.commit()

        return jsonify({"message": "Comment added successfully"}), 200
    except Exception as e:
        conn.rollback()
        print(f"Error: {str(e)}")  
        return jsonify({"error": "Internal server error", "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/get_comments/<title>', methods=['GET'])
def get_comments_by_title(title):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Log the title to verify it matches the request
        print(f"Fetching comments for book title: {title}")

        # Sanitize the title to avoid SQL injection
        sanitized_title = title.replace("'", "''")  # Example sanitization

        cursor.execute('''
            SELECT c.comment_id, c.user_id, u.username, c.comment, c.created_at
            FROM comments c
            JOIN users u ON c.user_id = u.id  # Assuming 'id' is the correct column name in the users table
            WHERE c.book_title = %s
            ORDER BY c.created_at DESC
        ''', (sanitized_title,))

        comments = cursor.fetchall()

        # Log the result of the query to check if any rows are returned
        print(f"Fetched comments: {comments}")

        comments_list = []
        for comment in comments:
            comments_list.append({
                "comment_id": comment[0],
                "user_id": comment[1],
                "book_title": comment[2],
                "comment": comment[3],
                "created_at": comment[4].strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify(comments_list), 200
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error fetching comments: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

