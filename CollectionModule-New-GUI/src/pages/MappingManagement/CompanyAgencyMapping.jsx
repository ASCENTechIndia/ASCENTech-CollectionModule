import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoader } from "../../context/LoaderContext";

const CompanyAgencyMapping = () => {

    const { user } = useAuth();
    const { setLoader } = useLoader();
    const { showError, showSuccess, showWarning } = useNotification();
    const navigate = useNavigate();

    const userId = user?.id;
    const branchCategory = user?.compId;
    const userLevel = user?.desgId;
    
    // const [loadingDropdown, setLoadingDropdown] = useState(false);
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            companyName: "",
            agencyName: "",
            action: "",
            effectiveDate: "",
            remark: ""
        }
    })


    const onSubmit = async (values) => {
        try {
            // setLoadingDropdown();
            setLoader(true);
            console.log(values);
            // const payload = {
            //     compname: values.companyName,
            //     agenname: values.agencyName,
            //     action: values.action,
            //     date: values.effectiveDate,
            //     remark: values.remark
            // }
            // const response = await apiClient.post("", payload);

            // if (response.success) {
            //     showSuccess("Sucessfully saved");
            //     reset();
            // } 
        } catch (error) {
            console.error(error);
            showError(error.message || "Something went wrong", 5000);
        } finally {
            // setLoadingDropdown(false);
            setLoader(false);
        }
    }


    return (
        <>
        
            {/* {loadingDropdown && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 9999 }}
                >
                    <div
                        className="spinner-border text-light"
                        style={{ width: "3rem", height: "3rem" }}
                    />
                </div>
            )} */}

            <div className="main-content">
                <div className="page-header">
                    <h1 className="page-title">Company Agency Mapping</h1>
                </div>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row mb-3">
                                <div className="col-12 col-md-6">
                                    <label className="form-label">
                                        Company Name <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("companyName", {
                                            required: "Company Name is required",
                                        })}
                                        className={`form-select ${errors.companyName ? "is-invalid" : ""}`}
                                    >
                                        <option value="">-- Select Option --</option>
                                        <option value="1">Company 1</option>
                                    </select>
                                    {errors.companyName && (
                                        <div className="invalid-feedback">
                                            {errors.companyName.message}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label">
                                        Agency Name <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("agencyName", {
                                            required: "Agency Name is required",
                                        })}
                                        className={`form-select ${errors.agencyName ? "is-invalid" : ""}`}
                                    >
                                        <option value="">-- Select Option --</option>
                                        <option value="1">Agency 1</option>
                                    </select>
                                    {errors.agencyName && (
                                        <div className="invalid-feedback">
                                            {errors.agencyName.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <label className="form-label">
                                        Action <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("action", {
                                            required: "Action is required",
                                        })}
                                        className={`form-select ${errors.action ? "is-invalid" : ""}`}
                                    >
                                        <option value="">-- Select Option --</option>
                                        <option value="A">Assign</option>
                                        <option value="T">Transfer</option>
                                        <option value="R">Remove</option>
                                    </select>
                                    {errors.companyName && (
                                        <div className="invalid-feedback">
                                            {errors.companyName.message}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label">Effective Date <span className="text-danger">*</span></label>
                                    <input
                                        type="date"
                                        {...register("effectiveDate", {
                                            required: "Date is required"
                                        })}
                                        className={`form-control ${errors.effectiveDate ? "is-invalid" : ""}`}
                                    />
                                    {errors.effectiveDate && (
                                        <div className="invalid-feedback">
                                            {errors.effectiveDate.message}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label">
                                        Remark <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        rows="2"
                                        {...register("remark", { required: "Remark is required" })}
                                        className={`form-control ${errors.remark ? "is-invalid" : ""}`}
                                    />
                                    <div className="invalid-feedback">{errors.remark?.message}</div>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <button type="submit" className="btn btn-primary me-2">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => reset()}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};

export default CompanyAgencyMapping;