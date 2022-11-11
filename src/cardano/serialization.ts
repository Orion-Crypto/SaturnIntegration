import { Buffer } from 'buffer';
import Loader from './loader';

export const fromHex = (hex: any) => Buffer.from(hex, 'hex');
export const toHex = (bytes: any) => Buffer.from(bytes).toString('hex');
