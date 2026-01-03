const { parentPort, workerData } = require("worker_threads");
const mongoose = require("mongoose");
const xlsx = require("xlsx");
require("dotenv").config();

const Agent = require("../models/agent.model");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const LOB = require("../models/lob.model");
const Carrier = require("../models/carrier.model");
const Policy = require("../models/policy.model");

(async () => {
  try {
    console.log("process.env.DB_CONNECTION_STRING ---> ", process.env.DB_CONNECTION_STRING);
    await mongoose.connect(process.env.DB_CONNECTION_STRING);

    const workbook = xlsx.readFile(workerData.filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    for (const row of rows) {
      // Agent
      await Agent.findOneAndUpdate(
        { agentName: row.agent },
        {
          agentName: row.agent,
          producer: row.producer,
          csr: row.csr,
          agencyId: row.agency_id,
        },
        { upsert: true }
      );

      // User
      const user = await User.findOneAndUpdate(
        { email: row.email },
        {
          firstName: row.firstname,
          dob: row.dob,
          address: row.address,
          phone: row.phone,
          state: row.state,
          zip: row.zip,
          gender: row.gender,
          userType: row.userType,
          city: row.city,
          isPrimary: row.primary,
          applicantId: row["Applicant ID"],
        },
        { upsert: true, new: true }
      );

      // Account
      await Account.findOneAndUpdate(
        { accountName: row.account_name, userId: user._id },
        {
          accountName: row.account_name,
          accountType: row.account_type,
          hasActivePolicy: row['hasActive ClientPolicy'],
          userId: user._id,
        },
        { upsert: true }
      );

      // LOB
      const lob = await LOB.findOneAndUpdate(
        { categoryName: row.category_name },
        { categoryName: row.category_name },
        { upsert: true, new: true }
      );

      // Carrier
      const carrier = await Carrier.findOneAndUpdate(
        { companyName: row.company_name },
        { companyName: row.company_name },
        { upsert: true, new: true }
      );

      // Policy
      await Policy.create({
        policyNumber: row.policy_number,
        policyStartDate: row.policy_start_date,
        policyEndDate: row.policy_end_date,
        policyType: row.policy_type,
        policyMode: row.policy_mode,
        premiumAmount: row.premium_amount,
        premiumWritten: row.premium_amount_written,
        userId: user._id,
        categoryId: lob._id,
        companyId: carrier._id,
      });
    }

    parentPort.postMessage({ success: true });
    process.exit(0);
  } catch (err) {
    parentPort.postMessage({ success: false, error: err.message });
    process.exit(1);
  }
})();
