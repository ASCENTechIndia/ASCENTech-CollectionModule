import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from "../../services/apiClient";
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";

const FrmNewDashboard2 = () => {
    const { user } = useAuth();
    const userId = user?.userId;
    const [showDetails, setShowDetails] = useState(false);

    const {
        register,
    } = useForm({
        defaultValues: {
            monthYear: getCurrentMonthYear()
        }
    });

    function getCurrentMonthYear(padded = false) {
        const now = new Date();

        let month = now.getMonth() + 1; // 0-based → 1-based
        const year = now.getFullYear();

        if (padded) {
            month = String(month).padStart(2, '0');
        }

        return `${month}-${year}`;
    }

    const colors = {
        accent: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#06b6d4',
        border: 'rgba(148, 163, 184, 0.25)',
        muted: '#64748b',
    }

    function ChartCard({ title, children, subtitle }) {
        return (
            <div className="card h-100">
                <div className="card-header">
                    <h5 className="card-title mb-1">{title}</h5>
                    {subtitle ? <p className="card-subtitle mb-0">{subtitle}</p> : null}
                </div>
                <div className="card-body">{children}</div>
            </div>
        )
    }

     const commonGrid = { left: '3%', right: '4%', bottom: '3%', containLabel: true }
        const axisStyle = { color: colors.muted }
        function useEChart(optionFactory) {
            const ref = useRef(null)
    
            useEffect(() => {
                if (!ref.current) return undefined
                const chart = echarts.init(ref.current)
                chart.setOption(optionFactory())
                const resize = () => chart.resize()
                window.addEventListener('resize', resize)
                return () => {
                    window.removeEventListener('resize', resize)
                    chart.dispose()
                }
            }, [optionFactory])
    
            return ref
        }
    
        const gradientArea = useEChart(() => ({
            tooltip: {
                trigger: 'axis',
                padding: [2, 6],
                textStyle: {
                    fontSize: 10,
                    lineHeight: 14
                },
                extraCssText: 'max-width:120px; max-height: 80px; white-space:normal;'
            },
            grid: commonGrid,
            legend: {
                show: true,
                top: 20,
                left: 'center',
                textStyle: {
                    color: colors.muted,
                    fontSize: 12
                }
            },
            xAxis: { type: 'category', boundaryGap: false, data: chartData.labels, axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
            yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
            series: [{
                name: 'Unique Collection Associate using the app on a day', type: 'line', smooth: true, data: chartData.datasets, itemStyle: { color: colors.accent }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: colors.accent }, { offset: 1, color: 'rgba(59,130,246,0.05)' }]) }
            }],
        }))
    return (
        <div className="main-content">
            <div className="page-header">
                <h1 className="page-title">Disposition Report</h1>
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb-item">
                        Home
                    </Link>
                    <span className="breadcrumb-item">Dashboard</span>
                    <span className="breadcrumb-item active">Disposition Report</span>
                </nav>
            </div>
             <div className="card p-4">
                <div className="row align-items-center g-3 ">
                    <div className="col-12">
                        <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                             <label className="form-label mb-0">
                                Select Month & Year:
                            </label>
                            <select className="form-select"
                                {...register("monthYear")}
                                onChange={(e) => {
                                    setShowDetails(false);
                                    fetchData(e.target.value);
                                }}
                            >
                                <option value="4-2025">April 2025</option>
                                <option value="5-2025">May 2025</option>
                                <option value="6-2025">June 2025</option>
                                <option value="7-2025">July 2025</option>
                                <option value="8-2025">August 2025</option>
                                <option value="9-2025">September 2025</option>
                                <option value="10-2025">October 2025</option>
                                <option value="11-2025">November 2025</option>
                                <option value="12-2025">December 2025</option>
                                <option value="1-2026">January 2026</option>
                                <option value="2-2026">February 2026</option>
                                <option value="3-2026">March 2026</option>
                                <option value="4-2026">April 2026</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card h-100 mt-3">
                    {/* <div className="echart-container" ref={gradientArea} /> */}
                </div>
             </div>
        </div>
    )
}

export default FrmNewDashboard2;