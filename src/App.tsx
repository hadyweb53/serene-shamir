import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { create } from "zustand"; // Use named import instead of default

// Zustand store for managing the table width, height, and color
const useTableStore = create((set) => ({
  width: 2, // Initial width of the table
  height: 0.01, // Initial height (thickness) of the table top
  color: "brown", // Initial color of the table top
  setWidth: (width) => set({ width }), // Function to update width
  setHeight: (height) => set({ height }), // Function to update height (thickness)
  setColor: (color) => set({ color }), // Function to update color
}));

// Table component that renders the table's 3D model
const Table = () => {
  const { width, height, color } = useTableStore((state) => state); // Get width, height, and color from Zustand store

  return (
    <group>
      {/* Table Top (Scale in both width and height) */}
      <Box args={[width, height, 1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={color} />
      </Box>

      {/* Table Legs (4 legs positioned based on the width and the height) */}
      <Box
        args={[0.1, 1, 0.1]}
        position={[-width / 2 + 0.05, 0.25 - height / 2, -0.45]}
      >
        <meshStandardMaterial color="darkbrown" />
      </Box>
      <Box
        args={[0.1, 1, 0.1]}
        position={[width / 2 - 0.05, 0.25 - height / 2, -0.45]}
      >
        <meshStandardMaterial color="darkbrown" />
      </Box>
      <Box
        args={[0.1, 1, 0.1]}
        position={[-width / 2 + 0.05, 0.25 - height / 2, 0.45]}
      >
        <meshStandardMaterial color="darkbrown" />
      </Box>
      <Box
        args={[0.1, 1, 0.1]}
        position={[width / 2 - 0.05, 0.25 - height / 2, 0.45]}
      >
        <meshStandardMaterial color="darkbrown" />
      </Box>
    </group>
  );
};

// Main App component that renders the 3D scene and the UI
const App = () => {
  const { setWidth, setHeight, setColor } = useTableStore((state) => state); // Access the setWidth, setHeight, and setColor functions from Zustand

  const [showColorOptions, setShowColorOptions] = useState(false);

  const colorOptions = [
    "brown",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
    "skin",
    "cyan",
    "white",
    "blueviolet",
    "darkcyan",
    "royalblue",
    "darkred",
  ];

  return (
    <div style={{ height: "100vh" }}>
      {/* 3D Scene */}
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Table />
        <OrbitControls />
      </Canvas>

      {/* Table Width Control */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
        }}
      >
        <label>
          Table Width:
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            defaultValue={2}
            onChange={(e) => setWidth(parseFloat(e.target.value))}
          />
        </label>
      </div>

      {/* Table Height (Thickness) Control */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "20px",
          zIndex: 10,
        }}
      >
        <label>
          Table Height (Thickness):
          <input
            type="range"
            min="0.1"
            max="0.3"
            step="0.1"
            defaultValue={0.1}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
          />
        </label>
      </div>

      {/* Button to toggle color options */}
      <div
        style={{
          position: "absolute",
          top: "90px",
          left: "10px",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setShowColorOptions(!showColorOptions)}
          style={{
            borderRadius: "15px", // Round the button
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Change Table Color
        </button>

        {/* Color Options (Displayed when the button is clicked) */}
        {showColorOptions && (
          <div
            style={{
              // marginTop: "10px",
              borderRadius: "10px",
              backgroundColor: "black",
              height: "90px",
              width: "35%",
              display: "flex",
              gap: "5px",
              flexWrap: "wrap",
            }}
          >
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => setColor(color)}
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  display: "inline-flex", // This ensures buttons stay inline
                  marginTop: "6px",
                  marginLeft: "5px", // Space between buttons
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
