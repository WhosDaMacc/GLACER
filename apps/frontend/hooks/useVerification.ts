import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFileVerification(cid: string) {
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    async function verifyFile() {
      try {
        const response = await axios.get(`/api/verify/${cid}`);
        setVerificationResult(response.data);
      } catch (error) {
        console.error('Verification failed', error);
      }
    }

    verifyFile();
  }, [cid]);

  return verificationResult;
}