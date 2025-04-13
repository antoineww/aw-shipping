# Antoine Wiles Shipping App

Project can be hosted run via cloud; via GitHub Codespace,
follow and use the given Codespace url: [Check this Codespace](http://localhost:3000).

- Otherwise install locally as seen below:

### Local setup
- Clone repo
- Install libs
```
npm install
```
- Run this application
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
#

## Design Decisions:
### UI:
- Using Material Design
### Coding conversions:
`Developing for scalability & good documentation`
- Have designated folders for key areas (Eg: /components, /pages, /data )
- Keep 1 class file, until class grows to need to be modularized into a folder  with `index.js` and its sub-files
- Keep /components purely functional with default props and/or self-state to ensure reusability with prop overwrite. Only use data injection in /pages.
- `Title-case + camelcase` on /components, `lowercase + camelcase` everywhere else
- Make variables simple to read and descriptive enough yet not overwhelming too read


#
# TODO CRITERIA CHECKLIST:

- [x] ASA-1: Skeleton Layout
  - [x] Common Reusable Components
  - [x] Folder & Files Layout scheme
- [x] ASA-2: Styling & UI/UX Design
  - [x] Material UI
  - [x] Color Palette
- [ ] ASA-3: Pages
  - [x] Dashboard
  - [ ] Debug:
    - [x] KitchenSink for UI
    - [ ] Testing folder

## 🎯 OBJECTIVES

Build a full-stack application that allows users to:

- [x] Upload a CSV file containing freight shipment details
- [ ] Process and validate the data
- [ ] Display insights via a dashboard

---

## 📦 REQUIREMENTS

### 1. ASA-4: Backend (Required)

The backend should accept a CSV file containing freight shipment data. You've been provided with the file `shipment_data.csv`. The structure of the data is defined in the `structure.md` file.

Develop an API using **TypeScript** that:

#### ✅ Processes the Data

- [ ] **Validation and Cleaning**

  - [x] Remove duplicates
  - [ ] Handle missing values if necessary

- [ ] **Key Calculations**

  - [ ] **Cargo Consolidation**  
    Suggest shipments that can be grouped by destination and departure date.
  - [ ] **Warehouse Utilization**  
    Show occupied vs. available warehouse space.  
    Assume total warehouse capacity is `60,000,000,000 cm³`.

    Formula:

    ```
    Utilization = (Total Volume of Shipments / Total Warehouse Capacity) * 100
    ```

#### ✅ Provides API Endpoints

- [x] Uploading CSV files (can be stored in file system)
- [ ] Retrieving shipment insights (metrics)
- [ ] Fetching individual shipment details

---

### 2. ASA-5: Frontend (Required – preferably using Next.js/React)

Build a UI that allows users to:

- [x] **Upload CSV Files**

  - [x] Users should be able to upload the shipment data for processing.

- [ ] **Dashboard with Visual Insights**

  - [ ] **Summary Statistics**

    - [ ] Total shipments
    - [ ] On-time vs. delayed shipments
    - [ ] Warehouse usage

  - [ ] **Charts and Graphs**

    - [ ] **Bar Chart**
      - [ ] Received count per carrier, per day
      - [ ] (Bonus: Any other useful metrics)
    - [ ] **Pie Chart**
      - [ ] Shipment volume by mode (air or sea)
      - [ ] Current warehouse utilization rate
    - [ ] **Line Chart** (Optional)
      - [ ] Warehouse capacity over the year  
        (x-axis: date, y-axis: number of packages received per day)
    - [ ] (Bonus: Any other useful metrics)

  - [ ] **Shipment Management Table**

    - [ ] Search and filter shipments by:
      - [ ] Status
      - [ ] Destination
      - [ ] Carrier
    - [ ] Click a shipment to view details

  - [ ] **Consolidation Recommendations** (Optional)
    - [ ] Display groupable shipments
    - [ ] Allow users to apply filters and generate a scoped CSV file

---

### 3. ASA-6: Additional Considerations

- [ ] Handle CSV files efficiently (assume over **1 million rows**)
- [ ] Ensure good **UI/UX design**
- [x] Provide **clear documentation** on setup and usage

---

## 🧪 EVALUATION CRITERIA

- [ ] **Frontend:** Usability, design, and data visualization quality
- [ ] **Backend:** API structure and data processing efficiency
- [ ] **Scalability:** Ability to handle large datasets efficiently
- [ ] **Documentation & Code Quality**

---

## 📦 DELIVERABLES

- [x] A GitHub repository with your code  
  (Alternatively, a download link to a zip file)
- [x] A `README` explaining:
  - [x] How to set up and run the project
  - [x] Your design decisions
  - [ ] Any trade-offs or assumptions made