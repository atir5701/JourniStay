# Step 1: Use official Node.js image from Docker Hub
FROM node:18.9.1

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Install build tools (for compiling native modules like bcrypt)
RUN apt-get update && apt-get install -y \
  build-essential \
  python3

# Step 4: Copy the package.json and package-lock.json (for npm install)
COPY package*.json . 

# Step 5: Install dependencies, including bcrypt
RUN npm install

# Step 6: Copy the rest of the application code to the container
COPY . .

# Step 7: Expose the port your app will run on
EXPOSE 8000

# Step 8: Use npm start instead of nodemon directly
CMD ["npm", "start"]
