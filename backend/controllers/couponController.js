const Coupon = require('../models/Coupon');

// Create new coupon
exports.createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json(coupon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all coupons
exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.status(200).json(coupons);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get coupon by id
exports.getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findByPk(req.params.id);
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update coupon
exports.updateCoupon = async (req, res) => {
    try {
        const [updated] = await Coupon.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Coupon not found' });
        }
        res.status(200).json({ message: 'Coupon updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete coupon
exports.deleteCoupon = async (req, res) => {
    try {
        const deleted = await Coupon.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Coupon not found' });
        }
        res.status(200).json({ message: 'Coupon deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
