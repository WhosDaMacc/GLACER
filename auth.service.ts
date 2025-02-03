import { Falcon, Kyber } from '@glacer/quantum';
import { auditLog } from '../monitoring';

export class QuantumAuth {
  async adminLogin(challenge: string, signature: string) {
    const publicKey = await this.getAdminPublicKey();
    const valid = Falcon.verify(challenge, signature, publicKey);
    
    if (!valid) {
      await auditLog.securityViolation('Invalid quantum signature');
      throw new AuthError('Quantum verification failed');
    }
    
    return this.generateSessionToken(publicKey);
  }
}