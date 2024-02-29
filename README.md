# A-World-Made-of-Drawings
#### Live: https://abdirahman-ai.github.io/A-World-Made-of-Drawings-Project/

# Harold's World: A 3D Drawing Adventure

This project brings to life Harold's magical world of drawings from the children's book *Harold and the Purple Crayon* by Crockett Johnson. Inspired by the early computer graphics research presented by Cohen et al. at ACM NPAR 2000, this project allows users to create virtual worlds by drawing strokes on the computer screen.

## Features Implemented

### 1. Drawing Strokes in the Sky
Users can draw strokes in the sky, which are interpreted by the system and projected onto a large sphere representing the sky.

### 2. Drawing Billboards Attached to the Ground
Drawing strokes that start on the ground and end in the air or on an existing billboard creates billboards attached to the ground. The system defines a 3D plane anchored to the ground at the stroke's starting point and projects the stroke onto this plane.

### 3. Drawing Hills and Valleys on the Ground
Users can draw strokes on the ground to create hills and valleys. The system modifies the existing 3D ground mesh based on the drawn strokes, following the algorithm described in the Harold research paper.

### 4. Walking Around
Dynamic camera height adjustment allows users to walk around the virtual world without clipping into the ground mesh. The camera's height is adjusted based on the elevation of the ground at the camera's location.

## How to Use

1. **Clone the Repository:** Clone the repository to your local machine using Git.

   ```bash
   git clone <repository-link>
   npm install
   npm run start
##  Project Structure
* src/: Contains the source code for the project.

* public/: Includes the HTML and CSS files for the web application.

* node_modules/: Stores the dependencies installed via npm.

* README.md: Project documentation.
## Demo 
