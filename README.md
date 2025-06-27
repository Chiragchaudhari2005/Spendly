# Spendly - Expense Tracker

Description:
Spendly is a full-stack cloud-integrated expense tracker that helps users record and visualize their daily, weekly, and monthly spending habits. Built using React, Node.js, and Google Cloud services like BigQuery, GCS, Cloud Scheduler, Pub/Sub, and Compute Engine (VM), this project demonstrates a scalable cloud-first architecture.

## Tech Stack
- **Frontend**: React.js + Tailwind CSS
- **Backend**: Express.js (Node.js) REST API
- **Cloud Services**:
  - Google Cloud Storage (GCS)
  - Google BigQuery
  - Cloud Scheduler
  - Pub/Sub
  - Compute Engine (VM)

## Features

- Submit transactions via a form (category, amount, note)

- View Statistics:
  - Total spent today
  - Average daily spending (last 7 days)
  - Monthly total
  - Dominant spending category
- View Charts for Daily, Weekly, Monthly, Yearly usage
- Filter spending history by day, week, month, year
- Data is processed and stored securely using Google Cloud

## Flow Diagram

![alt text](./Spendly%20Flow%20Diagram.png)

### 1. Frontend Input Form

* **User Interaction Point:** This is the primary interface where users interact with the application.
* **Functionality:** Users enter their expense details, including `amount`, `category`, and a `note`.
* **Communication:** Data submitted through the UI form is sent to the backend using an `HTTP POST` request.

### 2. REST API (Backend)

* **Purpose:** Serves as the central communication hub between the frontend and cloud storage.
* **Functionality:**
    * Receives user-submitted expense data from the frontend.
    * Transforms the incoming data into a structured JSON object.
    * Uploads the generated JSON expense file to a Google Cloud Storage (GCS) bucket.
* **Core Function:** `GCS Upload - JSON expense file`

### 3. Cloud Storage (GCS)

* **Purpose:** Acts as a temporary staging area for raw user expense JSON files.
* **Role:** `Object Storage`
* **Details:** These files are saved in a designated Google Cloud Storage bucket, holding the data before it undergoes further processing.

### 4. Cloud Scheduler

* **Purpose:** Orchestrates the periodic processing of the stored expense data.
* **Functionality:**
    * Schedules and sends messages to a Pub/Sub topic at defined intervals (e.g., every 10 minutes).
* **Role:** `Publishes Message to Pub/Sub`

### 5. Pub/Sub (Publisher-Subscriber)

* **Purpose:** Facilitates asynchronous and decoupled communication between services.
* **Functionality:**
    * Receives messages from the Cloud Scheduler.
    * Ensures reliable message delivery to all subscribed services.
    * One key subscriber is the Compute Engine instance running `subscriber.js`.
* **Core Function:** `Message Delivery`

### 6. Compute Engine (VM)

* **Purpose:** Hosts the `subscriber.js` application responsible for data processing.
* **Role:** `Data Processing & Insertion`
* **Functionality:**
    * Continuously listens for new messages from the Pub/Sub topic.
    * Upon receiving a message, it fetches the corresponding raw expense JSON file from GCS.
    * Parses and processes the data, cleaning and structuring it as required.
    * Inserts the cleaned and structured data into BigQuery.

### 7. BigQuery

* **Purpose:** Serves as the robust, scalable, and main structured data warehouse for all processed transaction records.
* **Functionality:**
    * Stores processed and cleaned expense data.
    * Provides extremely fast querying capabilities using standard SQL.
    * The data stored here is the source for all analytical insights, charts, summaries, and historical views presented to the user.
* **Core Function:** `Structured Data Queried by APIs`

### 8. Frontend (Stats, Charts, History)

* **Purpose:** The user-facing presentation layer that displays aggregated insights and historical expense data.
* **Functionality:**
    * Fetches processed data from BigQuery via the REST API.
    * Displays various aggregated insights, such as daily spending, monthly trends, and expense summaries.
    * Provides a detailed history view with filtering options (daily, weekly, monthly, and yearly).
* **Core Function:** `Presentation Layer`

## Contributors
- Chirag Chaudhari – Developer & Architect
- Powered by Google Cloud & OpenAI's ChatGPT assistance