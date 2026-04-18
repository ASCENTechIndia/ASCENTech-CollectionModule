import { useEffect } from 'react'

/**
 * Custom hook to initialize Bootstrap components (Collapse, Modal, Tooltip, Popover, etc.)
 * Automatically detects and initializes all Bootstrap interactive elements within the component
 */
export function useBootstrapComponents() {
  useEffect(() => {
    // Import Bootstrap components
    const { Collapse, Modal, Tooltip, Popover, Dropdown, Offcanvas, Carousel, Tab } = window.bootstrap

    // Initialize Collapse components (Accordion, Collapsibles)
    const collapseElements = document.querySelectorAll('[data-bs-toggle="collapse"]')
    collapseElements.forEach((element) => {
      // Collapse is auto-initialized by Bootstrap, but we ensure it's ready
      new Collapse(element, { toggle: false })
    })

    // Initialize Modals
    const modalElements = document.querySelectorAll('[data-bs-toggle="modal"]')
    modalElements.forEach((element) => {
      // Bootstrap auto-initializes modals on data-bs-toggle
    })

    // Initialize Tooltips
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipElements.forEach((element) => {
      new Tooltip(element)
    })

    // Initialize Popovers
    const popoverElements = document.querySelectorAll('[data-bs-toggle="popover"]')
    popoverElements.forEach((element) => {
      new Popover(element)
    })

    // Initialize Dropdowns
    const dropdownElements = document.querySelectorAll('[data-bs-toggle="dropdown"]')
    dropdownElements.forEach((element) => {
      new Dropdown(element)
    })

    // Initialize Offcanvas
    const offcanvasElements = document.querySelectorAll('[data-bs-toggle="offcanvas"]')
    offcanvasElements.forEach((element) => {
      new Offcanvas(element)
    })

    // Initialize Carousel
    const carouselElements = document.querySelectorAll('[data-bs-ride="carousel"]')
    carouselElements.forEach((element) => {
      new Carousel(element)
    })

    // Initialize Tabs
    const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]')
    tabElements.forEach((element) => {
      new Tab(element)
    })

    // Cleanup function
    return () => {
      // Optional: Dispose of Bootstrap components on unmount
      // This prevents memory leaks when navigating away
    }
  }, [])
}

export default useBootstrapComponents
