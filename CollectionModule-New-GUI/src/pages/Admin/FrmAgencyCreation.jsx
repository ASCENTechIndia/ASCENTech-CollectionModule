import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import apiClient from '../../services/apiClient';
import { useNotification } from '../../context/useNotification';
import { useLoader } from '../../context/LoaderContext';

const FrmAgencyCreation = () => {
  const { showSuccess, showError, showWarning } = useNotification();
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
      cityName: '',
      products: '',
      productOptions: [],
      smaBucket: [],
      address: '',
    },
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const selectedProduct = watch('products');
  const selectedProductOptions = watch('productOptions');

  // Product options mapping
  // const productOptionsMap = {
  //   '0': [],
  //   '1': [
  //     { value: 'Office', label: 'Office' },
  //     { value: 'Shop', label: 'Shop' },
  //     { value: 'Mall', label: 'Mall' },
  //   ],
  //   '2': [
  //     { value: 'House', label: 'House' },
  //     { value: 'Flat', label: 'Flat' },
  //     { value: 'Bungalow', label: 'Bungalow' },
  //   ],
  //   '3': [
  //     { value: 'Truck', label: 'Truck' },
  //     { value: 'Bus', label: 'Bus' },
  //     { value: 'Taxi', label: 'Taxi' },
  //   ],
  // };

  const [smaOptions, setSMAOptions] = useState([]);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoader(true);
        const response = await apiClient.get('/agency-creation/states');
        if (response?.length > 0) {
          setStates(response);
        } else {
          showError('Failed to load states');
        }
      } catch (error) {
        console.error(error);
        showError(error?.message || 'Failed to load states');
      } finally {
        setLoader(false);
      }
    };

    const fetchSMAOptions = async () => {
      try {
        setLoader(true);

        const response = await apiClient.get(`/agency-creation/sma-buckets`);

        if (response.length > 0) {
          setSMAOptions(response);
        } else {
          showWarning("Failed to fetch SMA options");
          setSMAOptions([]);
        }
      } catch (error) {
        console.error(error);
        showError(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch SMA options",
        );
        setSMAOptions([]);
      } finally {
        setLoader(false);
      }
    }

    fetchStates();
    fetchSMAOptions();
  }, []);

  // Fetch districts when state changes
  const selectedState = watch('stateID');
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedState) {
        try {
          const response = await apiClient.get(`/agency-creation/districts?stateId=${selectedState}`, {
            params: { stateID: selectedState },
          });

          if (response?.length > 0) {
            setDistricts(response);
          } else {
            setDistricts([]);
          }
        } catch (error) {
          console.error(error);
          showError(
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch districts options",
          );
          setDistricts([]);
        }
      } else {
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, [selectedState]);

  useEffect(() => {
    const fetchProductOptions = async () => {
      if (selectedProduct) {
        try {
          setLoader(true);
          const response = await apiClient.get(`/agency-creation/product-options`, {
            params: { mainProduct: Number(selectedProduct) },
          });

          if (response?.length > 0) {
            setProductOptions(response);
          } else {
            setProductOptions([]);
          }
        } catch (error) {
          console.error(error);
          setProductOptions([]);
          showError(
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch product options",
          );
        } finally {
          setLoader(false);
        }
      } else {
        setProductOptions([]);
      }
    }

    fetchProductOptions();
  }, [selectedProduct]);

  const onSubmit = async (values) => {
    try {
      // setLoader(true);
      // setLoading(true);

      // Prepare payload
      const payload = {
        agencyName: values.agencyName,
        stateID: parseInt(values.stateID),
        districtID: parseInt(values.districtID),
        cityName: values.cityName,
        address: values.address,
        products: (values.productOptions || []).join(','),
        smaBucket: (values.smaBucket || []).join(','),
      };

      console.log(payload);
      return;

      const response = await apiClient.post('/agency-creation/create', payload);

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
                <label className="form-label">Agency Name <span className='text-danger'>*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.agencyName ? 'is-invalid' : ''}`}
                  placeholder="Enter agency name"
                  {...register('agencyName', {
                    required: 'Agency Name is required',
                    minLength: {
                      value: 3,
                      message: 'Agency Name must be at least 3 characters',
                    },
                  })}
                />
                {errors.agencyName && (
                  <div className="invalid-feedback d-block">{errors.agencyName.message}</div>
                )}
              </div>

              {/* State */}
              <div className="col-12 col-md-6">
                <label className="form-label">Select State <span className='text-danger'>*</span></label>
                <select
                  className={`form-select ${errors.stateID ? 'is-invalid' : ''}`}
                  {...register('stateID', {
                    required: 'State is required',
                  })}
                >
                  <option value="">-- Select State --</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.stateID && (
                  <div className="invalid-feedback d-block">{errors.stateID.message}</div>
                )}
              </div>

              {/* District */}
              <div className="col-12 col-md-6">
                <label className="form-label">Select District <span className='text-danger'>*</span></label>
                <select
                  className={`form-select ${errors.districtID ? 'is-invalid' : ''}`}
                  {...register('districtID', {
                    required: 'District is required',
                  })}
                  disabled={!selectedState}
                >
                  <option value="">-- Select District --</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {errors.districtID && (
                  <div className="invalid-feedback d-block">{errors.districtID.message}</div>
                )}
              </div>

              {/* Agency City/Village */}
              <div className="col-12 col-md-6">
                <label className="form-label">Agency City <span className='text-danger'>*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.cityName ? 'is-invalid' : ''}`}
                  placeholder="Enter city/village name"
                  {...register('cityName', {
                    required: 'City/Village is required',
                  })}
                />
                {errors.cityName && (
                  <div className="invalid-feedback d-block">{errors.cityName.message}</div>
                )}
              </div>

              {/* Agency Products */}
              <div className="col-12 col-md-6">
                <label className="form-label">Agency Products <span className='text-danger'>*</span></label>
                <select
                  className={`form-select ${errors.products ? 'is-invalid' : ''}`}
                  {...register('products', {
                    required: 'Product category is required',
                  })}
                >
                  <option value="">-- Select Main Product --</option>
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
                <label className="form-label">Select Options <span className='text-danger'>*</span></label>
                <div className={`border rounded p-3 ${errors.productOptions ? 'border-danger' : ''}`}>
                  {productOptions?.length > 0 ? (
                    productOptions.map((option) => (
                      <div key={option.value} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`option-${option.value}`}
                          value={option.value}
                          {...register('productOptions')}
                        />
                        <label className="form-check-label" htmlFor={`option-${option.value}`}>
                          {option.name}
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
                <label className="form-label">Select SMA Bucket <span className='text-danger'>*</span></label>
                <div className={`border rounded p-3 ${errors.smaBucket ? 'border-danger' : ''}`}>
                  {smaOptions.map((option) => (
                    <div key={option.id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`sma-${option.id}`}
                        value={option.id}
                        {...register('smaBucket')}
                      />
                      <label className="form-check-label" htmlFor={`sma-${option.id}`}>
                        {option.name}
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
                <label className="form-label">Agency Address <span className='text-danger'>*</span></label>
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
