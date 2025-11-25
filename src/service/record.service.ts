import { Types } from 'mongoose';
import { Farm, IFarm, IRecord } from '../models/farm.model';

export const addRecordToFarm = async (farmId: string, record: IRecord) => {
  const farm = await Farm.findById(farmId);
  if (!farm) throw new Error('Farm not found');

  farm.records.push(record as any);
  // normalize totalSheds if needed:
  await farm.save();
  // return the pushed record (last element)
  return farm.records[ farm.records.length - 1 ];
};

export const listRecords = async (farmId: string) => {
  const farm = await Farm.findById(farmId).select('records').lean();
  if (!farm) throw new Error('Farm not found');
  return farm.records;
};

export const getRecord = async (farmId: string, recordId: string) => {
  const farm = await Farm.findById(farmId).select('records').lean();
  if (!farm) throw new Error('Farm not found');
  const rec = (farm.records || []).find(r => r._id?.toString() === recordId);
  if (!rec) throw new Error('Record not found');
  return rec;
};

export const updateRecordInFarm = async (farmId: string, recordId: string, updates: Partial<IRecord>) => {
  const farm = await Farm.findById(farmId);
  if (!farm) throw new Error('Farm not found');

  const rec = farm.records.find(r => r._id?.toString() === recordId);
  if (!rec) throw new Error('Record not found');

  Object.assign(rec, updates);
  await farm.save();
  return rec;
};

export const deleteRecordFromFarm = async (farmId: string, recordId: string) => {
  const farm = await Farm.findById(farmId);
  if (!farm) throw new Error('Farm not found');

  const idx = farm.records.findIndex(r => r._id?.toString() === recordId);
  if (idx === -1) throw new Error('Record not found');
  farm.records.splice(idx, 1);
  await farm.save();
  return { success: true };
};
