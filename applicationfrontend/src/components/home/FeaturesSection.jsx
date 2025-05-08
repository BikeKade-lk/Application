import React from "react";
import { Box } from "@mui/material";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      title: "Wide Selection",
      description: "Browse our extensive catalog of motorcycle parts and accessories for all major brands."
    },
    {
      title: "Quality Products",
      description: "We source only the best parts to ensure performance, durability, and safety."
    },
    {
      title: "Expert Support",
      description: "Our team of motorcycle enthusiasts is here to help you find the right parts."
    }
  ];

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </Box>
  );
}