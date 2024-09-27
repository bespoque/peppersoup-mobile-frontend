// import { useState, useEffect, useRef } from "react";
// import { useApi } from "@/src/hooks/useApi";

// interface Side {
//   id: number;
//   name: string;
//   amount: string;
// }

// export const useSides = () => {
//   const { request } = useApi();
//   const [sides, setSides] = useState<Side[]>([]);
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     const fetchSides = async () => {
//       if (hasFetched.current) return;
//       try {
//         const data = await request('/api/core/kitchen-operations/item-sides/all', 'GET');
//         if (data.resp_code === "00") {
//           setSides(data.data.map((item: any) => ({
//             id: item.id,
//             name: item.name,
//             amount: item.amount,
//           })));
//           hasFetched.current = true;
//         }
//       } catch (err) {
//         console.error("Failed to fetch sides:", err);
//       }
//     };

//     fetchSides();
//   }, [request]);

//   return { sides };
// };
