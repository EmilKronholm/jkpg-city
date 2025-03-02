const express = require("express")
const router = express.Router()
const VendorServices = require("./../Services/vendorServices")

// List all vendors
router.get('/vendors', async (req, res) => {
    const limit = req.query.limit || 5;
    const offset = req.query.offset || 0;

    console.log(limit, offset);

    const vendorJSON = await VendorServices.getAllVendors(limit, offset);
    res.status(200).json(vendorJSON);
});

// Get vendor based on ID
router.get('/vendors/:id', async (req, res) => {
    const vendorJSON = await VendorServices.getVendor();
    res.status(200).json(vendorJSON);
});

// Update vendor. ID via query and new field passed via body (json)
router.put('/vendors/:id', async (req, res) => {
    const { id, url, name, districtFK } = req.body;
    const result = await VendorServices.updateVendor(id, url, name, districtFK);
    res.status(200).json(result);

});

module.exports = router