const mongoose = require("mongoose");
const Policy = require("../models/policy.model");

exports.searchPolicyByUsername = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res
        .status(400)
        .json({ message: "username query param is required" });
    }

    const result = await Policy.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          $or: [{ "user.firstName": username }, { "user.email": username }],
        },
      },
      {
        $lookup: {
          from: "accounts",
          localField: "user._id",
          foreignField: "userId",
          as: "account",
        },
      },
      {
        $lookup: {
          from: "lobs",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "carriers",
          localField: "companyId",
          foreignField: "_id",
          as: "carrier",
        },
      },
      {
        $project: {
          policyNumber: 1,
          policyStartDate: 1,
          policyEndDate: 1,
          policyType: 1,
          policyMode: 1,
          premiumAmount: 1,
          premiumWritten: 1,
          user: {
            firstName: "$user.firstName",
            email: "$user.email",
            phone: "$user.phone",
            city: "$user.city",
            state: "$user.state",
          },
          account: { $arrayElemAt: ["$account", 0] },
          category: { $arrayElemAt: ["$category", 0] },
          carrier: { $arrayElemAt: ["$carrier", 0] },
        },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No policies found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.aggregatePoliciesByUser = async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPolicies: { $sum: 1 },
          totalPremium: { $sum: "$premiumAmount" },
          policies: {
            $push: {
              policyNumber: "$policyNumber",
              policyType: "$policyType",
              policyMode: "$policyMode",
              premiumAmount: "$premiumAmount",
              policyStartDate: "$policyStartDate",
              policyEndDate: "$policyEndDate",
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          user: {
            firstName: "$user.firstName",
            email: "$user.email",
            city: "$user.city",
            state: "$user.state",
          },
          totalPolicies: 1,
          totalPremium: 1,
          policies: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};