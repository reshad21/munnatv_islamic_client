import { TRole } from "@/types/auth.types";
import React from "react";

interface GroupFeatureProps {
  role: TRole | undefined;
}

const GroupFeature: React.FC<GroupFeatureProps> = ({ role }) => {
  const roleFeature = role?.roleFeature || [];
  const featureCount = roleFeature.length;

  // Show only the first two features
  const visibleFeatures = roleFeature.slice(0, 2);
  // Calculate remaining features count
  const remainingCount = featureCount > 2 ? featureCount - 2 : 0;

  return (
    <div className="flex items-center gap-1">
      {visibleFeatures.map((feature, index) => (
        <React.Fragment key={feature.id || index}>
          <span className="text-sm border rounded-full px-1">
            {feature.name}
          </span>
          {index < visibleFeatures.length - 1 && remainingCount === 0 && (
            <span className="text-muted-foreground">,</span>
          )}
        </React.Fragment>
      ))}

      {remainingCount > 0 && (
        <>
          {visibleFeatures.length > 0 && (
            <span className="text-muted-foreground"></span>
          )}
          <span className="text-sm text-muted-foreground">
            +{remainingCount} more
          </span>
        </>
      )}

      {featureCount === 0 && (
        <span className="text-sm text-muted-foreground">No features</span>
      )}
    </div>
  );
};

export default GroupFeature;
