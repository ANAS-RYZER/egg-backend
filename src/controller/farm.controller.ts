import { Request, Response, NextFunction } from 'express';
import * as farmService from '../service/farm.service';
import { IShed } from '../models/farm.model';

export const addFarm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, location, totalSheds, ownerName, sheds } = req.body as {
      name?: string;
      location?: string;
      totalSheds?: number;
      ownerName?: string;
      sheds?: IShed[];
    };

    if (!name) return res.status(400).json({ message: 'Farm name is required' });
    if (typeof totalSheds !== 'number' && (!Array.isArray(sheds) || sheds.length === 0)) {
      return res.status(400).json({ message: 'Either totalSheds (number) or sheds (array) is required' });
    }

    // Optional: validate each shed object shape
    if (Array.isArray(sheds)) {
      for (const s of sheds) {
        if (!s.name ) {
          return res.status(400).json({ message: 'Each shed must have name ' });
        }
      }
    }

    const saved = await farmService.createFarm({
      name,
      location,
      totalSheds: totalSheds ?? (sheds ? sheds.length : 0),
      ownerName,
      sheds
    });

    res.status(201).json({ message: 'Farm created', farm: saved });
  } catch (err) {
    next(err);
  }
};

export const listFarms = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const farms = await farmService.getFarms();
    res.json({ farms });
  } catch (err) {
    next(err);
  }
};

export const singleFarm = async (req : Request , res : Response  , next : NextFunction)=> {

        try {
            const { farmId  } = req.params;

             const farmsdetailsById = await farmService.getFarmById(farmId);
             res.json({farmsdetailsById})
        }
        catch (err){ 
            next(err)
        }
}