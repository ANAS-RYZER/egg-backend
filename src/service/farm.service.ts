import { Farm, IFarm, IShed } from '../models/farm.model';
import { Types } from 'mongoose';

export const createFarm = async (payload: {
  name: string;
  location?: string;
  totalSheds: number;
  ownerName?: string;
  sheds?: IShed[];
}) => {
  // Basic consistency check: totalSheds should match sheds length (if you want)
  if (payload.sheds && payload.sheds.length !== payload.totalSheds) {
    // Either adjust or throw — here we normalize totalSheds
    payload.totalSheds = payload.sheds.length;
  }

  const farm = new Farm({
    name: payload.name,
    location: payload.location,
    totalSheds: payload.totalSheds,
    ownerName: payload.ownerName,
    sheds: payload.sheds || []
  });

  return await farm.save();
};

export const getFarms = async () => {
  return await Farm.find().lean();
};



export const getFarmById = async (farmId: string): Promise<IFarm | null> => {
    if (!Types.ObjectId.isValid(farmId)) throw new Error('Invalid farmId');
    const farm = await Farm.findById(farmId);
    return farm;
  };