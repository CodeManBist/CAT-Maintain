import WorkOrder from "../models/WorkOrder.js";

export const createWorkOrder = async (req, res) => {
    const { 
        equipmentId, 
        issueType, 
        priority, 
        assignedTo, 
        description, 
        estimatedCost 
    } = req.body;

    const workOrder = await WorkOrder.create({
        equipmentId,
        issueType,
        priority,
        assignedTo,
        description,
        estimatedCost,
    });

    res.status(201).json(workOrder);
};

export const getWorkOrders = async (req, res) => {
    let query = {};

    if(req.user.role === "technician") {
        query.assignedTo = req.user._id;
    }

    const workOrders = await WorkOrder.find(query)
        .populate("equipmentId", "name serialNumber")
        .populate("assignedTo", "name email");

    res.json(workOrders);
};

export const getWorkOrderById = async (req, res) => {
    const workOrder = await WorkOrder.findById(req.params.id)
        .populate("equipmentId")
        .populate("assignedTo", "name email")
        .populate("comments.user", "name role");
        
        if(!workOrder) {
            return res.status(404).json({ message: "Work order not found" });
        }

        res.json(workOrder);
};

export const updateWorkOrderStatus = async (req, res) => {
    const { status } = req.body;

    const workOrder = await WorkOrder.findById(req.params.id);

    if(!workOrder) {
        return res.status(404).json({ message: "Work order not found" });
    }

    workOrder.status = status;
    await workOrder.save();

    res.json(workOrder);
};

export const addComment = async (req, res) => {
    const { message } = req.body;

    const workOrder = await WorkOrder.findById(req.params.id);

    if(!workOrder) {
        return res.status(400).json({ message: "Work order not found" });
    }

    workOrder.comments.push({
        user: req.user._id,
        message,
    })

    await workOrder.save();

    res.json(workOrder);
}

export const assignTechnician = async (req, res) => {
    const { technicianId } = req.body;

    const workOrder = await WorkOrder.findById(req.params.id);

    if(!workOrder) {
        return res.status(404).json({ message: "Work order not found" });
    }

    workOrder.assignedTo = technicianId;
    await workOrder.save();

    res.json(workOrder);
};

