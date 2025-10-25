# Forms Components

This directory contains reusable form components for managing core business entities in the logistics/delivery management system.

## Directory Structure

```
components/forms/
├── ShipmentForm.js
├── VehicleForm.js
├── DriverForm.js
├── index.js
└── README.md
```

## Components Overview

### 1. ShipmentForm (`ShipmentForm.js`)
A comprehensive form for creating and editing shipment records.

**Features:**
- Auto-generated tracking numbers
- Customer selection with search modal
- Package type and priority selection
- Address management (pickup/delivery)
- Special handling options (fragile, refrigerated, signature required)
- Delivery instructions and scheduling
- Form validation with error handling
- Save/cancel functionality

**Key Fields:**
- Tracking information
- Customer details
- Pickup/delivery addresses
- Package specifications (weight, dimensions, value)
- Delivery options and priority
- Schedule information
- Internal notes

### 2. VehicleForm (`VehicleForm.js`)
A detailed form for vehicle fleet management.

**Features:**
- Auto-generated vehicle numbers
- Driver assignment with availability checking
- Vehicle specifications and features
- Insurance and registration tracking
- Maintenance scheduling
- Comprehensive validation
- Status management

**Key Fields:**
- Vehicle identification (VIN, license plate, make/model)
- Specifications (capacity, weight limits, fuel type)
- Driver assignment
- Insurance information
- Registration details
- Maintenance records
- Vehicle features (GPS, AC, refrigeration, lift gate)

### 3. DriverForm (`DriverForm.js`)
A complete form for driver/employee management.

**Features:**
- Auto-generated employee IDs
- Comprehensive personal information
- License and certification tracking
- Vehicle assignment
- Performance metrics
- Medical and background check records
- Emergency contact management

**Key Fields:**
- Personal information (name, contact, address)
- Emergency contact details
- License information and expiry tracking
- Employment details (hire date, salary, position)
- Medical clearances and certifications
- Performance metrics
- Vehicle assignment

## Usage

### Basic Import and Usage

```javascript
import { ShipmentForm, VehicleForm, DriverForm } from './components/forms';

// Create mode
<ShipmentForm
  mode="create"
  onSave={(data) => console.log('Shipment created:', data)}
  onCancel={() => console.log('Cancelled')}
/>

// Edit mode with initial data
<VehicleForm
  mode="edit"
  initialData={existingVehicleData}
  onSave={(data) => console.log('Vehicle updated:', data)}
  onCancel={() => console.log('Cancelled')}
/>
```

### Props Interface

All forms share a consistent prop interface:

```javascript
{
  initialData?: object,    // Pre-populate form (edit mode)
  onSave: function,        // Callback when form is saved
  onCancel: function,      // Callback when form is cancelled
  mode?: 'create' | 'edit' // Form mode (default: 'create')
}
```

### Integration with Modals

Forms are designed to work seamlessly with modal interfaces:

```javascript
import { Modal } from 'react-native';
import { ShipmentForm } from './components/forms';

<Modal visible={showForm} animationType="slide">
  <ShipmentForm
    mode="create"
    onSave={(data) => {
      // Handle save
      setShowForm(false);
    }}
    onCancel={() => setShowForm(false)}
  />
</Modal>
```

## Form Validation

All forms include comprehensive validation:

- **Required fields** are marked with red asterisks
- **Real-time validation** with error messages
- **Data type validation** (numbers, emails, dates)
- **Business logic validation** (expiry dates, ranges)
- **Visual error indicators** on invalid fields

## Data Management

### Mock Data
All forms currently use mock data for:
- Customer lists (ShipmentForm)
- Driver lists (VehicleForm)
- Vehicle lists (DriverForm)

### API Integration
To integrate with your backend:

1. Replace mock data functions with API calls
2. Update save handlers to call your endpoints
3. Add proper error handling for network requests
4. Implement loading states during API calls

Example API integration:

```javascript
const handleSave = async (formData) => {
  try {
    setIsLoading(true);
    const response = await fetch('/api/shipments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const savedData = await response.json();
      onSave(savedData);
    } else {
      throw new Error('Failed to save');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to save. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

## Styling Customization

Forms use a consistent styling system that can be easily customized:

```javascript
const styles = StyleSheet.create({
  // Override default styles
  input: {
    // Custom input styling
  },
  button: {
    // Custom button styling
  }
});
```

## Auto-Generation Features

### Tracking Numbers (ShipmentForm)
- Format: `SHP{timestamp}{random}`
- Example: `SHP1234567890123`

### Vehicle Numbers (VehicleForm)
- Format: `VEH-{timestamp}{random}`
- Example: `VEH-123456789`

### Employee IDs (DriverForm)
- Format: `EMP-{timestamp}{random}`
- Example: `EMP-123456789`

## Accessibility Features

- **Screen reader support** with proper labels
- **Keyboard navigation** for all interactive elements
- **High contrast** error indicators
- **Large touch targets** for mobile devices

## Performance Considerations

- **Optimized re-renders** with proper state management
- **Efficient scrolling** with proper key props
- **Lazy loading** for dropdown options
- **Debounced validation** to prevent excessive checks

## Common Use Cases

### 1. New Shipment Creation
```javascript
<ShipmentForm
  mode="create"
  onSave={(shipment) => {
    // Add to shipments list
    setShipments([...shipments, shipment]);
    // Close form
    setShowForm(false);
  }}
  onCancel={() => setShowForm(false)}
/>
```

### 2. Vehicle Fleet Management
```javascript
<VehicleForm
  mode="edit"
  initialData={selectedVehicle}
  onSave={(vehicle) => {
    // Update vehicle in fleet
    updateVehicleInFleet(vehicle);
    setShowForm(false);
  }}
  onCancel={() => setShowForm(false)}
/>
```

### 3. Driver Onboarding
```javascript
<DriverForm
  mode="create"
  onSave={(driver) => {
    // Add new driver to system
    addDriverToSystem(driver);
    // Send welcome email
    sendWelcomeEmail(driver.email);
    setShowForm(false);
  }}
  onCancel={() => setShowForm(false)}
/>
```

## Future Enhancements

- **File upload** support for documents and photos
- **Barcode scanning** for tracking numbers and VINs
- **GPS integration** for address validation
- **Signature capture** for delivery confirmations
- **Multi-step wizard** for complex forms
- **Draft saving** for incomplete forms
- **Form templates** for common scenarios

## Contributing

When modifying forms:

1. Maintain consistent validation patterns
2. Follow the established styling conventions
3. Test on both iOS and Android
4. Update mock data as needed
5. Document any new props or features
6. Ensure accessibility compliance