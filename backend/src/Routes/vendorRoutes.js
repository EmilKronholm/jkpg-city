const express = require("express")
const router = express.Router()
const VendorServices = require("./../Services/vendorServices")
const { authenticateJWT } = require('./loginRoutes')

// List all vendors
router.get('/vendors', async (req, res) => {
    const limit = req.query.limit || 5;
    const offset = req.query.offset || 0;

    const search = req.query.search || "";

    console.log(limit, offset, search);

    const vendorJSON = await VendorServices.getAllVendors(limit, offset, search);
    return res.status(200).json(vendorJSON);
});

// Get vendor based on ID
router.get('/vendors/:id', async (req, res) => {
    const id = req.params.id || 0;
    const vendorJSON = await VendorServices.getVendor(id);
    return res.status(200).json(vendorJSON);
});

// Update vendor. ID via query and new field passed via body (json)
router.put('/vendors/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id
    const { url, name, district } = req.body || null;

    if (id === undefined) {
        return res.status(400).json({ message: "No valid id was given." })
    }

    const result = await VendorServices.updateVendor(id, url, name, district);
    return res.status(200).json(result);
});

router.post('/vendors', authenticateJWT, async (req, res) => {
    const { url, name, district } = req.body || null;

    await VendorServices.createVendor(url, name, district);
    res.status(200).json({ message: "Vendor was created successfully." });
});

// Delete vendor with id
router.delete('/vendors/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id

    if (id === undefined) {
        return res.status(400).json({ message: "ID wasn't passed correctly" });
    }

    const result = await VendorServices.deleteVendor(id);
    return res.status(200).json(result);
});

module.exports = router