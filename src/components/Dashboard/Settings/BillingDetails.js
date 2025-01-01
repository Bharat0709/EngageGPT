import React, { useState } from 'react';
import { Button, Form, Input, Table, message, Collapse } from 'antd';

const { Panel } = Collapse;

const BillingDetails = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const billingDetails = {
    planName: 'Pro Plan',
    planCost: 49.99,
    billingCycle: 'Monthly',
    renewalDate: '2025-02-01',
    addressLine1: '123 SaaS Avenue',
    addressLine2: 'Suite 101',
    city: 'San Francisco',
    state: 'California',
    country: 'USA',
    postalCode: '94105',
    phoneNumber: '123-456-7890',
  };

  const paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '12/26' },
    { id: 2, type: 'PayPal', last4: 'N/A', expiry: 'N/A' },
  ];

  const invoices = [
    {
      id: 1,
      date: '2024-12-01',
      amount: '$49.99',
      status: 'Paid',
      downloadLink: '#',
    },
    {
      id: 2,
      date: '2024-11-01',
      amount: '$49.99',
      status: 'Paid',
      downloadLink: '#',
    },
  ];

  const usageSummary = '75% of your monthly API calls used (750/1000).';

  const handleBillingUpdate = async (values) => {
    setLoading(true);
    try {
      message.success('Billing details updated successfully!');
      console.log('Updated Billing Details:', values);
    } catch (err) {
      message.error('Failed to update billing details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaymentMethod = async () => {
    setLoading(true);
    try {
      message.success('Payment method added successfully!');
      console.log('Payment method added.');
    } catch (err) {
      message.error('Failed to add payment method.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = () => {
    message.warning('Subscription cancellation is in progress.');
    console.log('Cancel subscription clicked.');
  };

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <a href={record.downloadLink}>Download</a>,
    },
  ];

  return (
    <div className="rounded-xl">
      <h3 className="text-lg mb-4">Billing Details</h3>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Current Plan" key="1">
          <div className="mb-4">
            <p>
              <strong>Plan Name:</strong> {billingDetails.planName}
            </p>
            <p>
              <strong>Cost:</strong> ${billingDetails.planCost} /{' '}
              {billingDetails.billingCycle}
            </p>
            <p>
              <strong>Renewal Date:</strong> {billingDetails.renewalDate}
            </p>
            <p>
              <strong>Usage:</strong> {usageSummary}
            </p>
            <Button type="primary" className="mr-2">
              Upgrade Plan
            </Button>
            <Button danger onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
          </div>
        </Panel>

        {/* Billing Information */}
        <Panel header="Billing Information" key="2">
          <Form
            form={form}
            layout="vertical"
            initialValues={billingDetails}
            onFinish={handleBillingUpdate}
          >
            <Form.Item
              label="Address Line 1"
              name="addressLine1"
              rules={[
                { required: true, message: 'Please enter address line 1' },
              ]}
            >
              <Input placeholder="Address Line 1" />
            </Form.Item>
            <Form.Item label="Address Line 2" name="addressLine2">
              <Input placeholder="Address Line 2" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: 'Please enter your state' }]}
            >
              <Input placeholder="State" />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Please enter your country' }]}
            >
              <Input placeholder="Country" />
            </Form.Item>
            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[
                { required: true, message: 'Please enter your postal code' },
              ]}
            >
              <Input placeholder="Postal Code" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input placeholder="Phone Number" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </Form>
        </Panel>

        {/* Payment Methods */}
        <Panel header="Payment Methods" key="3">
          <div className="mb-4">
            {paymentMethods.map((method) => (
              <p key={method.id}>
                {method.type} ending in {method.last4} (Expires {method.expiry})
              </p>
            ))}
            <Button
              type="primary"
              onClick={handleAddPaymentMethod}
              loading={loading}
            >
              Add Payment Method
            </Button>
          </div>
        </Panel>

        {/* Invoice History */}
        <Panel header="Invoices & Payment History" key="4">
          <Table
            columns={columns}
            dataSource={invoices}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 5 }}
          />
        </Panel>

        {/* Usage Summary */}
        <Panel header="Usage & Overages" key="5">
          <p>
            <strong>Usage:</strong> {usageSummary}
          </p>
          <p>
            <strong>Overage Charges:</strong> None
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default BillingDetails;
