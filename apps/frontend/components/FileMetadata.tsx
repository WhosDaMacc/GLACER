import React from 'react';
import { useFileMetadata } from '../hooks/useMetadata';

export default function FileMetadata({ cid }: { cid: string }) {
  const metadata = useFileMetadata(cid);

  if (!metadata) return <div>Loading...</div>;

  return (
    <div>
      <h3>File Metadata</h3>
      <p>CID: {metadata.cid}</p>
      <p>Owner: {metadata.owner}</p>
      <p>Tier: {metadata.tier}</p>
      <p>Last Verified: {new Date(metadata.lastVerified * 1000).toLocaleString()}</p>
    </div>
  );
}