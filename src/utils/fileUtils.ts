// src/utils/fileUtils.ts

// Function to check if a string is a Base64-encoded file
export function isBase64File(base64String: string): boolean {
    const base64Pattern = /^data:(.*?);base64,/; // Check for Base64 prefix
    return base64Pattern.test(base64String);
  }
  
  // Function to convert a Base64 string to a File object
  export function base64ToFile(base64String: string, filename: string): File {
    const arr = base64String.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Invalid base64 string: MIME type not found.");
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }
  