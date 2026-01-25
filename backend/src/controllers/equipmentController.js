import Equipment from '../models/Equipment.js';

export const createEquipment = async (req, res) => {
    try {
        const { name, serialNumber, model, location, status, runningHours, lastServiceDate } = req.body;
        const existsingEquipment = await Equipment.findOne({ serialNumber });
        if (existsingEquipment) {
            return res.status(400).json({ error: 'Equipment with this serial number already exists' });
        }

        const equipment = await Equipment.create({
            name,
            serialNumber,   
            model,
            location,
            status,
            runningHours,
            lastServiceDate
        });

        res.status(201).json(equipment);
    } catch(err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getEquipments = async (req, res) => {
    try {
        const { search, location, status } = req.query;
        
        let filter = {};

        if(search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { model: { $regex: search, $options: 'i' } },
                { serialNumber: { $regex: search, $options: 'i' } }
            ]
        }

        if(location) {
            filter.location = location;
        }

        if(status) {
            filter.status = status;
        }

        const equipments = await Equipment.find(filter).sort({ createdAt: -1 });
        res.json(equipments);
    } catch(err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({ error: 'Equipment not found' });
        }
        res.json(equipment);
    } catch(err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);

        if(!equipment) {
            return res.status(404).json({ error: 'Equipment not found' });
        }

        const updated  = await Equipment.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});

        res.json(updated);
    } catch(err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);

        if(!equipment) {
            return res.status(404).json({ error: 'Equipment not found' });
        }

        await equipment.deleteOne();
        res.json({ message: 'Equipment deleted successfully' });
    } catch(err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}