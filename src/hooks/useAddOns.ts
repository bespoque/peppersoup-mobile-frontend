// import { useState, useEffect, useRef } from "react";
// import { useApi } from "@/src/hooks/useApi";

// interface AddOn {
//   id: number;
//   name: string;
//   amount: string;
// }

// export const useAddOns = () => {
//   const { request } = useApi();
//   const [addOns, setAddOns] = useState<AddOn[]>([]);
//   const hasFetched = useRef(false); // Ref to track if data has been fetched

//   useEffect(() => {
//     const fetchAddOns = async () => {
//       if (hasFetched.current) return; // Prevent re-fetching
//       try {
//         const data = await request('/api/core/kitchen-operations/adds-on/all', 'GET');
//         if (data.resp_code === "00") {
//           setAddOns(data.data.map((item: any) => ({
//             id: item.id,
//             name: item.name,
//             amount: item.amount,
//           })));
//           hasFetched.current = true; // Mark as fetched
//         }
//       } catch (err) {
//         console.error("Failed to fetch add-ons:", err);
//       }
//     };

//     fetchAddOns();
//   }, [request]); // Only fetch if request changes

//   return { addOns };
// };
