import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import apiClient from '../../services/apiClient';
import { useNotification } from '../../context/useNotification';
import { useLoader } from '../../context/LoaderContext';

const FrmAgencyCreation = () => {
  const { showSuccess, showError } = useNotification();
  const { setLoader } = useLoader();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      agencyName: '',
      stateID: '',
      districtID: '',
      villageName: '',
      products: '0',
      productOptions: [],
      smaBucket: [],
      address: '',
    },
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const selectedProduct = watch('products');
  const selectedProductOptions = watch('productOptions');

  // Product options mapping
  const productOptionsMap = {
    '0': [],
    '1': [
      { value: 'Office', label: 'Office' },
      { value: 'Shop', label: 'Shop' },
      { value: 'Mall', label: 'Mall' },
    ],
    '2': [
      { value: 'House', label: 'House' },
      { value: 'Flat', label: 'Flat' },
      { value: 'Bungalow', label: 'Bungalow' },
    ],
    '3': [
      { value: 'Truck', label: 'Truck' },
      { value: 'Bus', label: 'Bus' },
      { value: 'Taxi', label: 'Taxi' },
    ],
  };

  const smaOptions = [
    { value: 'ALL SMA', label: 'ALL SMA' },
    { value: 'SMA0', label: 'SMA0' },
    { value: 'SMA1', label: 'SMA1' },
    { value: 'SMA2', label: 'SMA2' },
  ];

  // Fetch states on component mount
  // useEffect(() => {
  //   const fetchStates = async () => {
  //     try {
  //       setLoadingInitial(true);
  //       const response = await apiClient.get('/agency/states');

  //       if (response?.success && response?.data) {
  //         setStates(response.data);
  //       } else {
  //         showError('Failed to load states');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       showError(error?.message || 'Failed to load states');
  //     } finally {
  //       setLoadingInitial(false);
  //     }
  //   };

  //   fetchStates();
  // }, []);

  // Fetch districts when state changes
  const selectedState = watch('stateID');
  // useEffect(() => {
  //   const fetchDistricts = async () => {
  //     if (selectedState) {
  //       try {
  //         const response = await apiClient.get('/agency/districts', {
  //           params: { stateID: selectedState },
  //         });

  //         if (response?.success && response?.data) {
  //           setDistricts(response.data);
  //         } else {
  //           setDistricts([]);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         setDistricts([]);
  //       }
  //     } else {
  //       setDistricts([]);
  //     }
  //   };

  //   fetchDistricts();
  // }, [selectedState]);

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      setLoading(true);

      // Prepare payload
      const payload = {
        agencyName: values.agencyName,
        stateID: parseInt(values.stateID),
        districtID: parseInt(values.districtID),
        villageName: values.villageName,
        address: values.address,
        products: (values.productOptions || []).join(','),
        smaBucket: (values.smaBucket || []).join(','),
      };

      const response = await apiClient.post('/agency', payload);

      if (response?.success) {
        showSuccess('Agency created successfully!');
        reset();
        // Optionally redirect
        // navigate('/admin/agencies');
      } else {
        showError(response?.message || 'Failed to create agency');
      }
    } catch (error) {
      console.error(error);
      showError(error?.message || 'Failed to create agency. Please try again.');
    } finally {
      setLoader(false);
      setLoading(false);
    }
  };

  // if (loadingInitial) {
  //   return (
  //     <div className="main-content page-agency-creation">
  //       <div className="page-header">
  //         <h1 className="page-title">Agency Creation</h1>
  //       </div>
  //       <div className="card">
  //         <div className="card-body text-center py-5">
  //           <p>Loading form data...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="main-content page-agency-creation">
      <div className="page-header">
        <h1 className="page-title">Agency Creation</h1>
      </div>

      <div className="card">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              {/* Agency Name */}
              <div className="col-12 col-md-6">
                <label className="form-label">Agency Name *</label>
                <input
                  type="text"
                  className={`form-control ${errors.agencyName ? 'is-invalid' : ''}`}
                  placeholder="Enter agency name"
                  {...register('agencyName', {
                    required: 'Agency Name is required',
                    minLength: {
                      value: 2,
                      message: 'Agency Name must be at least 2 characters',
                    },
                  })}
                />
                {errors.agencyName && (
                  <div className="invalid-feedback d-block">{errors.agencyName.message}</div>
                )}
              </div>

              {/* State */}
              <div className="col-12 col-md-6">
                <label className="form-label">Select State *</label>
                <select
                  className={`form-select ${errors.stateID ? 'is-invalid' : ''}`}
                  {...register('stateID', {
                    required: 'State is required',
                  })}
                >
                  <option value="">-- Select State --</option>
                  {states.map((state) => (
                    <option key={state.STATEID} value={state.STATEID}>
                      {state.STATENAME}
                    </option>
                  ))}
                </select>
                {errors.stateID && (
                  <div className="invalid-feedback d-block">{errors.stateID.message}</div>
                )}
              </div>

              {/* District */}
              <div className="col-12 col-md-6">
                <label className="form-label">Select District *</label>
                <select
                  className={`form-select ${errors.districtID ? 'is-invalid' : ''}`}
                  {...register('districtID', {
                    required: 'District is required',
                  })}
                  disabled={!selectedState}
                >
                  <option value="">-- Select District --</option>
                  {districts.map((district) => (
                    <option key={district.DISTRICTID} value={district.DISTRICTID}>
                      {district.DISTRICTNAME}
                    </option>
                  ))}
                </select>
                {errors.districtID && (
                  <div className="invalid-feedback d-block">{errors.districtID.message}</div>
                )}
              </div>

              {/* Agency City/Village */}
              <div className="col-12 col-md-6">
                <label className="form-label">Agency City *</label>
                <input
                  type="text"
                  className={`form-control ${errors.villageName ? 'is-invalid' : ''}`}
                  placeholder="Enter city/village name"
                  {...register('villageName', {
                    required: 'City/Village is required',
                  })}
                />
                {errors.villageName && (
                  <div className="invalid-feedback d-block">{errors.villageName.message}</div>
                )}
              </div>

              {/* Agency Products */}
              <div className="col-12 col-md-6">
                <label className="form-label">Agency Products *</label>
                <select
                  className={`form-select ${errors.products ? 'is-invalid' : ''}`}
                  {...register('products', {
                    required: 'Product category is required',
                  })}
                >
                  <option value="0">-- Select Main Product --</option>
                  <option value="1">Commercial</option>
                  <option value="2">Non Commercial</option>
                  <option value="3">Transport</option>
                </select>
                {errors.products && (
                  <div className="invalid-feedback d-block">{errors.products.message}</div>
                )}
              </div>

              {/* Product Options (Checkboxes) */}
              <div className="col-12 col-md-6">
                <label className="form-label">Select Options *</label>
                <div className={`border rounded p-3 ${errors.productOptions ? 'border-danger' : ''}`}>
                  {productOptionsMap[selectedProduct]?.length > 0 ? (
                    productOptionsMap[selectedProduct].map((option) => (
                      <div key={option.value} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`option-${option.value}`}
                          value={option.value}
                          {...register('productOptions')}
                        />
                        <label className="form-check-label" htmlFor={`option-${option.value}`}>
                          {option.label}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted mb-0">Please select a product category first</p>
                  )}
                </div>
                {errors.productOptions && (
                  <div className="invalid-feedback d-block">{errors.productOptions.message}</div>
                )}
              </div>

              {/* SMA Bucket */}
              <div className="col-12 col-md-6">
                <label className="form-label">Select SMA Bucket *</label>
                <div className={`border rounded p-3 ${errors.smaBucket ? 'border-danger' : ''}`}>
                  {smaOptions.map((option) => (
                    <div key={option.value} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`sma-${option.value}`}
                        value={option.value}
                        {...register('smaBucket')}
                      />
                      <label className="form-check-label" htmlFor={`sma-${option.value}`}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.smaBucket && (
                  <div className="invalid-feedback d-block">{errors.smaBucket.message}</div>
                )}
              </div>

              {/* Agency Address */}
              <div className="col-12">
                <label className="form-label">Agency Address *</label>
                <textarea
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  placeholder="Enter agency address"
                  rows="3"
                  {...register('address', {
                    required: 'Address is required',
                    minLength: {
                      value: 5,
                      message: 'Address must be at least 5 characters',
                    },
                  })}
                />
                {errors.address && (
                  <div className="invalid-feedback d-block">{errors.address.message}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary px-5"
              >
                {loading ? 'Creating Agency...' : 'Create Agency'}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-secondary px-5"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FrmAgencyCreation;
