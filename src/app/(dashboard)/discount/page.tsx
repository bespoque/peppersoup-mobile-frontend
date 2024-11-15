
"use client";

import DiscountTable from "@/src/components/DIscountTable";
import NewDiscountForm from "@/src/components/NewDiscountForm";
import React, { useState } from "react";

export default function Discount() {
  const [showNewPromoForm, setShowNewPromoForm] = useState(false);

  return (
    <div className=" p-6">
      {!showNewPromoForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Discount and Promotions</h2>
            <button
              onClick={() => setShowNewPromoForm(true)}
              className="bg-paleGreen font-semibold text-black py-2 px-4 rounded shadow hover:bg-green-600"
            >
              Add New
            </button>
          </div>
          <DiscountTable />
        </>
      ) : (
        <NewDiscountForm onClose={() => setShowNewPromoForm(false)} />
      )}
    </div>
  );
}
