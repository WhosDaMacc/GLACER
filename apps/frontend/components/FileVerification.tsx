import React from 'react';
import { useFileVerification } from '../hooks/useFileVerification';

export default function FileVerification({ cid }: { cid: string }) {
  const verificationResult = useFileVerification(cid);

  if (!verificationResult) return <div>Loading...</div>;
  if (verificationResult.error) return <div>Error: {verificationResult.error}</div>;

  return (
    <div>
      <h3>File Verification</h3>
      <p>CID: {verificationResult.cid}</p>
      <p>Is Valid: {verificationResult.isValid ? 'Yes' : 'No'}</p>
    </div>
  );
}