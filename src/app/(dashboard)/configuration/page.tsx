"use client";
import ConfigurationTabs from "@/src/components/ConfigurationTabs";

import React from "react";

export default function Configuration() {
  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Menu Configuration</h2>
      <ConfigurationTabs />
    </div>
  );
}
