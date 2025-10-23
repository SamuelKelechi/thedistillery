import React from "react";
import "./skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image shimmer"></div>
      <div className="skeleton-text shimmer"></div>
      <div className="skeleton-subtext shimmer"></div>
    </div>
  );
};

export default SkeletonCard;
