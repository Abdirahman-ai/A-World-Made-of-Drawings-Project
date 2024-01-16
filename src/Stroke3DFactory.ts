/* Assignment 6: Harold: A World Made of Drawings
 * UMN CSci-4611 Instructors 2018+
 * Stroke3DFactory class by Prof. Dan Keefe, Fall 2023
 * Please do not distribute beyond the CSci-4611 course
 */ 

import * as gfx from 'gophergfx'
import { Stroke2D } from './Stroke2D';
import { Billboard } from './Billboard';


/** 
 * This class holds static functions to handle the cases where the user's Stroke2D should be turned into
 * a new geometry, like a Mesh3 that goes in the sky or a Billboard that is attached to the ground. 
 */
export class Stroke3DFactory
{

    /**
     * Creates and returns a new Mesh3 by projecting the Stroke2D drawn by the user onto a sky sphere
     * of the specified radius.
     * 
     * @param stroke2D The stroke drawn by the user. All the points and vertices of this stroke will
     * be defined in normalized device coordinates (-1,-1) to (1,1).
     * @param camera The camera used while drawing the stroke. This is used within the routine to
     * create pick rays that originate at the camera's position and pass through the vertices of the
     * stroke2D.
     * @param skyRadius The radius of the sky sphere the stroke is projected onto.
     * @returns A new Mesh3 that holds the projected version of the stroke and can be added to the scene.
     */
    public static createSkyStrokeMesh(stroke2D: Stroke2D, camera: gfx.Camera, skyRadius: number): gfx.Mesh3
    {
        // TODO: Part 1: Draw Sky Strokes
        // Define a sky sphere of the appropriate radius (1)
        // Define a sky sphere of the appropriate radius
        const skySphere = new gfx.BoundingSphere();
        skySphere.center = new gfx.Vector3(0, 0, 0);
        skySphere.radius = skyRadius;

        // Create and return a new Mesh3 from the createSkyStrokeMesh() function (1)
        // Create a new Mesh3 for the sky stroke with the appropriate material settings
        // Hint #2: When creating a new Mesh3, you can setup it's material to be the same color as the stroke2D with:
        // newMesh.material = new gfx.UnlitMaterial();
        // newMesh.material.side = gfx.Side.DOUBLE;
        // newMesh.material.setColor(stroke2D.color);
        const newMesh = new gfx.Mesh3();
        newMesh.material = new gfx.UnlitMaterial();
        newMesh.material.side = gfx.Side.DOUBLE;
        newMesh.material.setColor(stroke2D.color);

        // Array to hold the vertices projected onto the sky sphere
        const vertices: gfx.Vector3[] = [];

        // Project each point in the stroke2D path onto the sky sphere
        // Hint #1: The Ray class in GopherGfx has an intersectsSphere() routine that you can use to
        // project the stroke2D onto a "sky sphere".
        for(let i=0; i<stroke2D.vertices.length; i++){
            // Create at least one pick ray originating at the camera (1)
            const pickRay = new gfx.Ray3();
            pickRay.setPickRay(stroke2D.vertices[i], camera);

            const intersection = pickRay.intersectsSphere(skySphere);
            // Correctly set the vertices of the Mesh3 to project the input stroke onto the sky (4)
            // If there's an intersection, add the 3D point to the vertices array
            if (intersection) {
                console.log("intersection")
                vertices.push(intersection);
            } else {
                //
                console.log("no intersection")
            }
        }
        // Set the vertices and 
        newMesh.setVertices(vertices);
        if (vertices.length > 0) {
            // set the indices using the existing indices from the Stroke2D class
            newMesh.setIndices(stroke2D.indices);
        }
       return newMesh;
    }

    /** 
     * Creates and returns a new Billboard object by projecting the Stroke2D drawn by the user onto a 3D plane.
     * The plane is defined by a point within the plane (anchorPointWorld) and a normal, which points from the
     * billboard's anchor point to the camera but without any variation in Y since the billboards in Harold are
     * always vertical planes (i.e., with no tilt up or down). 
     * 
     * Note, the Billboard class is just a small wrapper around a Mesh3.  So, the majority of the functionality
     * in this routine relates to projecting the stroke2D onto a plane and creating a new Mesh3 to hold the
     * result.  This new Mesh3 is then wrapped in a new Billboard object.
     * 
     * @param stroke2D The stroke drawn by the user. All the points and vertices of this stroke will
     * be defined in normalized device coordinates (-1,-1) to (1,1).
     * @param camera The camera used while drawing the stroke. This is used within the routine to
     * create pick rays that originate at the camera's position and pass through the vertices of the
     * stroke2D.
     * @param anchorPointWorld The 3D point on the ground that the billboard should be attached to and
     * rotate around.
     * @returns A new Billboard object that can be added to the scene.
     */
    public static createBillboard(stroke2D: Stroke2D, camera: gfx.Camera, anchorPointWorld: gfx.Vector3): Billboard
    {
        // TODO: Part 2: Draw Billboards Attached to the Ground
        // Hint #1: To get the position of the camera in world coordinates, you can use the camera's localToWorld matrix
        // to transform the origin of camera space (0,0,0) to world space.
        const originOfCameraSpace = new gfx.Vector3(0,0,0);
        const cameraPositionWorld = camera.localToWorldMatrix.transformPoint(originOfCameraSpace);
        const billboardNormmal = gfx.Vector3.subtract(cameraPositionWorld, anchorPointWorld);
        billboardNormmal.y = 0;
        billboardNormmal.normalize();

        // Hint #2: When creating a new billboard Mesh3, you can setup it's material to be the same color as the stroke2D with:
        // newMesh.material = new gfx.UnlitMaterial();
        // newMesh.material.side = gfx.Side.DOUBLE;
        // newMesh.material.setColor(stroke2D.color);
        const newMesh = new gfx.Mesh3();
        newMesh.material = new gfx.UnlitMaterial();
        newMesh.material.side = gfx.Side.DOUBLE;
        newMesh.material.setColor(stroke2D.color);

        const vertices: gfx.Vector3[] = [];
        for(let i=0; i<stroke2D.vertices.length; i++){ 
            const pickRay = new gfx.Ray3();
            pickRay.setPickRay(stroke2D.vertices[i], camera);

            const  plane = new gfx.Plane3(anchorPointWorld, billboardNormmal);
            const intersection = pickRay.intersectsPlane(plane);
            if(intersection){
                vertices.push(intersection);
            }else{
                console.log("no intersection")
            }
        }

        // set the vertices
        newMesh.setVertices(vertices);
        // set the indices using the existing indices from Stroke2D class
        newMesh.setIndices(stroke2D.indices);

        // Create and return the Billboard object
        return new Billboard(anchorPointWorld, billboardNormmal, newMesh);
    }
}
