# Antoine Wiles Shipping App

Project can be hosted run via cloud; via GitHub Codespace,
follow and use the given Codespace url: 
1. [Check this Codespace](https://curly-spork-75jvrjrxrpj3wp7r.github.dev/).

OR

1. Setup local by Clone repo then
2. Install libs & setup Sqlite db 
```
npm install
npm prisma generate
npm prisma db push
```
3. Run this application in dev mode
```
npm run dev
```
- OR
3. Run this application in prod mode
```
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
#

## Design Decisions:
### UI:
- Using Material UI Design
- Center Column Accordion dashboard for UI simplification
### Backend:
- NextJS /api
- Prisma ORM with SQLite
### Coding conversions:
`Developing for scalability & good documentation`
- Have designated folders for key areas (Eg: /components, /pages, /data )
- Keep 1 class file, until class grows to need to be modularized into a folder  with `index.js` and its sub-files
- Keep /components purely functional with default props and/or self-state to ensure reusability with prop overwrite. Only use data injection in /pages.
- `Title-case + camelcase` on /components, `lowercase + camelcase` everywhere else
- Make variables simple to read and descriptive enough yet not overwhelming too read
- Long/complex react hooks simplified into custom hooks via in same component folder or shared StateController hooks
- Using useState, useEffect & props propagation to update data


#
# TODO CRITERIA CHECKLIST:

- [x] ASA-1: Skeleton Layout
  - [x] Common Reusable Components
  - [x] Folder & Files Layout scheme
- [x] ASA-2: Styling & UI/UX Design
  - [x] Material UI
  - [x] Color Palette
- [x] ASA-3: Pages
  - [x] Dashboard
  - [x] Debug:
    - [x] KitchenSink for UI
    - [ ] Testing folder

## 🎯 OBJECTIVES

Build a full-stack application that allows users to:

- [x] Upload a CSV file containing freight shipment details
- [x] Process and validate the data
- [x] Display insights via a dashboard

---

## 📦 REQUIREMENTS

### 1. ASA-4: Backend (Required)

The backend should accept a CSV file containing freight shipment data. You've been provided with the file `shipment_data.csv`. The structure of the data is defined in the `structure.md` file.

Develop an API using **TypeScript** that:

#### ✅ Processes the Data

- [x] **Validation and Cleaning**

  - [x] Remove duplicates
- [x] Handle missing values if necessary

- [x] **Key Calculations**

  - [x] **Cargo Consolidation**  
    Suggest shipments that can be grouped by destination and departure date.
  - [x] **Warehouse Utilization**  
    Show occupied vs. available warehouse space.  
    Assume total warehouse capacity is `60,000,000,000 cm³`.

    Formula:

    ```
    Utilization = (Total Volume of Shipments / Total Warehouse Capacity) * 100
    ```

#### ✅ Provides API Endpoints

- [x] Uploading CSV files (can be stored in file system)
- [x] Retrieving shipment insights (metrics)
- [x] Fetching individual shipment details

---

### 2. ASA-5: Frontend (Required – preferably using Next.js/React)

Build a UI that allows users to:

- [x] **Upload CSV Files**

  - [x] Users should be able to upload the shipment data for processing.

- [x] **Dashboard with Visual Insights**

  - [x] **Summary Statistics**

    - [x] Total shipments
    - [x] On-time vs. delayed shipments
    - [x] Warehouse usage

  - [x] **Charts and Graphs**

    - [xx] **Bar Chart**
      - [x] Received count per carrier, per day
      - [ ] (Bonus: Any other useful metrics)
    - [x] **Pie Chart**
      - [x] Shipment volume by mode (air or sea)
      - [ ] Current warehouse utilization rate
    - [x] **Line Chart** (Optional)
      - [x] Warehouse capacity over the year  
        (x-axis: date, y-axis: number of packages received per day)
    - [ ] (Bonus: Any other useful metrics)

  - [x] **Shipment Management Table**

    - [x] Search and filter shipments by:
      - [x] Status
      - [x] Destination
      - [x] Carrier
    - [x] Click a shipment to view details

  - [x] **Consolidation Recommendations** (Optional)
    - [x] Display groupable shipments
    - [x] Allow users to apply filters and generate a scoped CSV file

---

### 3. ASA-6: Additional Considerations

- [x] Handle CSV files efficiently (assume over **1 million rows**)
  - [x] Parse via file stream & insert in batches
- [x] Ensure good **UI/UX design**
- [x] Provide **clear documentation** on setup and usage

---

## 🧪 EVALUATION CRITERIA

- [x] **Frontend:** Usability, design, and data visualization quality
- [x] **Backend:** API structure and data processing efficiency
- [x] **Scalability:** Ability to handle large datasets efficiently
- [x] **Documentation & Code Quality**

---

## 📦 DELIVERABLES

- [x] A GitHub repository with your code  
  (Alternatively, a download link to a zip file)
- [x] A `README` explaining:
  - [x] How to set up and run the project
  - [x] Your design decisions
  - [x] Any trade-offs or assumptions made:
    - using SQLite for demo purposes; BUT Postgres is ideal for this job to hit the 1 million rows upload comfortably; has built-in pagination, metrics & REST API capabitlies to handle huge sums of data out-of-box & via plugins; requiring less new code handling
    - Need to test&find load size csv files and metrics calcutions
      - Currently parses 11MB file with 150,000 rows in under 2mins in dev mode (under 1min in prod mode)
    - Followed most lint & type errors, but disabled for prod build for test-demo purposes