import { FileRegistered } from '../generated/MetadataRegistry/MetadataRegistry'
import { File } from '../generated/schema'

export function handleFileRegistered(event: FileRegistered): void {
  let file = new File(event.params.cid.toHexString());
  file.owner = event.params.owner;
  file.quantumHash = event.params.quantumHash.toHexString();
  file.timestamp = event.block.timestamp;
  file.save();
}