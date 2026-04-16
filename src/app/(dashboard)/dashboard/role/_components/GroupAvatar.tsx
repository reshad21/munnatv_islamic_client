/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { TAdminUser } from "@/types/auth.types";


interface GroupAvatarProps {
  users?: TAdminUser[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GroupAvatar({
  users,
  size = "md",
  className,
}: GroupAvatarProps) {
  const [isHovering, setIsHovering] = useState(false);

  // Size mapping
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <TooltipProvider>
      <div className="flex items-center">
        {users?.map((user, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Avatar
                className={cn(
                  sizeClasses[size],
                  "border-2 border-background",
                  index > 0 && "-ml-2",
                  className
                )}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <AvatarImage src={user.profilePhoto} alt={user.fullName} />
                <AvatarFallback className="bg-muted">
                  {user.fullName ? (
                    getInitials(user.fullName)
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.fullName}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
