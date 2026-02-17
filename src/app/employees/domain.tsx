"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Tabs, { Tab } from "@/components/Tabs";
import TableSkeleton from "@/components/TableSkeleton";
import { AlertTriangle, ShieldAlert, ShieldCheck, ExternalLink } from 'lucide-react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserIcon,
  UserPlusIcon,
  PencilSquareIcon,
  EyeIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeSlashIcon
} from '@heroicons/react/24/solid'

import { BellAlertIcon, BellIcon } from "@heroicons/react/24/outline";

import Modal, { ModalHeader, ModalBody, ModalFooter } from "@/components/Modals";
import Accordian, { AccordianHeader, AccordianBody } from "@/components/Accordian";

import { EmployeeExposureData } from "../data/EmployeeExposureData";
const mockData = EmployeeExposureData;

import SelectDropdown, { DropdownOption } from "@/components/Select";
import Button from "@/components/Button";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import Badge from "@/components/Badge";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TablePagination,
  TableStructure,
} from "@/components/Table";

import {
  useUserDomains,
  useEmployeesByDomain,
  useUpdateEmployeeContact,
  useCreateEmployee,
  useThreatAnalysisJobs,
  type CreateEmployeeData,
} from "@/hooks/useEmployeesApi";
import useDebounce from "@/hooks/useDebounce";
import useAppContext from "@/providers/AppContextProvider/useAppContext";
import type { Employee, ThreatAnalysisJob } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";

import Title from "@/components/Title";
import Intro from "@/components/Intro";
import { useDomainExposure, type ExposureCredential } from '@/hooks/useDomainExposure';
import SearchBox from "@/components/form/search";
import SimpleSelect from "@/components/SimpleSelect";


const employeeModalTab: Tab[] = [
  { name: "Upload Manually" },
  { name: "Upload Using Csv" }
]

const employeeType = [
  { id: 1, name: 'All Employee' },
  { id: 2, name: 'Active Employee' },
  { id: 3, name: 'Inactive Employee' },
]

const domainOption = [
  { id: 1, name: 'Select Domain' },
  { id: 2, name: 'example.com' }
]

interface ContactFormData extends Record<string, unknown> {
  workEmail: string;
  personalEmail: string;
  phoneNumber: string;
}

const Domain: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Identity theft");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(employeeType[0]);
  const [selectedDomain, setSelectedDomain] = useState(domainOption[0])
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [addAlertAll, setAddAlertAll] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertBtnLoading, setAlertBtnLoading] = useState(false);
  const [alertAllBtnLoading, setAlertAllBtnLoading] = useState(false);

  const handleViewOpen = () => {
    setViewOpen(true);
  }

  const handleTabChange = (tab: Tab) => {
    if (tab.name === activeTab) return;
    setCurrentPage(1);
    setIsLoading(true);
    setActiveTab(tab.name);
    setTimeout(() => setIsLoading(false), 600);
  };

  const getThreatIcon = (level: string) => {
    const iconClass = "h-4 w-4";
    switch (level) {
      case "CRITICAL":
      case "HIGH":
        return (
          <ShieldExclamationIcon className={`${iconClass} text-red-600`} />
        );
      case "MEDIUM":
        return (
          <AlertTriangle className={`${iconClass} text-amber-600`} />
        );
      case "LOW":
        return (
          <ShieldCheck className={`${iconClass} text-emerald-600`} />
        );
      default:
        return <ShieldCheck className={`${iconClass} text-green-600`} />;
    }
  };

  const [tableData, setTableData] = useState(mockData);
  const handleStatusToggle = (id: string) => {
    setTableData(prev =>
      prev.map(item =>
        item.id === id
          ? {
            ...item,
            status: item.status === "resolve" ? "resolved" : "resolve",
          }
          : item
      )
    );
  };

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);



  const handleAlertModal = (employee: any) => {
    setSelectedEmployee(employee);
    setAlertOpen(true);
  };

  const [selectedDomainId, setSelectedDomainId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showThreatAnalysisNotification, setShowThreatAnalysisNotification] =
    useState(false);
  const [threatAnalysisMessage, setThreatAnalysisMessage] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [pageInput, setPageInput] = useState("");
  const [contactForm, setContactForm] = useState<ContactFormData>({
    workEmail: "",
    personalEmail: "",
    phoneNumber: "",
  });



  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { isAuthenticated } = useAppContext();
  // React Query hooks
  const queryClient = useQueryClient();
  const {
    data: domains,
    isLoading: domainsLoading,
    error: domainsError,
  } = useUserDomains(isAuthenticated);
  console.log(domains)
  const {
    data: employeesData,
    isLoading: employeesLoading,
    isRefetching,
    error: employeesError,
    refetch: refetchEmployees,
  } = useEmployeesByDomain(selectedDomainId, currentPage, limit, debouncedSearchTerm);

  const updateContactMutation = useUpdateEmployeeContact();
  const createEmployeeMutation = useCreateEmployee();

  const [companyId, setCompanyId] = useState(employeesData?.company?.id.toString());

 

  const [addEmployeeForm, setAddEmployeeForm] = useState<CreateEmployeeData>({
    fullName: "",
    title: "",
    workEmail: "",
    personalEmail: "",
    phoneNumber: "",
    locality: "",
    companyId: "",
  });

  useEffect(() => {
  if (!employeesData?.company?.id) return;

  const id = employeesData.company.id.toString();

  setCompanyId(id);

  setAddEmployeeForm(prev => ({
    ...prev,
    companyId: id,
  }));

}, [employeesData]);
  // Get user's threat analysis jobs
  const {
    data: threatAnalysisJobs,
    error: jobsError,
    isLoading: jobsLoading,
  } = useThreatAnalysisJobs();

  // Debug logging
  React.useEffect(() => {
    console.log("Threat analysis jobs data:", threatAnalysisJobs);
    console.log("Jobs error:", jobsError);
    console.log("Jobs loading:", jobsLoading);
    if (threatAnalysisJobs) {
      console.log(
        "Has active jobs:",
        threatAnalysisJobs.summary?.hasActiveJobs
      );
      console.log("Active job count:", threatAnalysisJobs.summary?.active);
    }
  }, [threatAnalysisJobs, jobsError, jobsLoading]);

  // Helper functions
  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "bg-red-100 text-red-800 border-red-200";
      case "HIGH":
        return "bg-red-50 text-red-700 border-red-100";
      case "MEDIUM":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      case "LOW":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-green-50 text-green-700 border-green-100";
    }
  };


  const fetchEmployeeDetails = async (employeeId: string) => {
    try {
      // This would be your API call to get employee threat details
      // const response = await axios.get(`/employees/${employeeId}/threats`);
      // setEmployeeDetails(response.data);

      // For now, using mock data structure
      console.log("Fetching details for employee:", employeeId);
    } catch (error) {
      console.error("Failed to fetch employee details:", error);
    }
  };

  const showNotification = () => {
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 3000);
  };

  // Set first domain as default when domains load
  React.useEffect(() => {
    if (domains && domains.length > 0 && !selectedDomainId) {
      setSelectedDomainId(domains[0].id);
    }
  }, [domains, selectedDomainId]);

  // Reset page when domain changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedDomainId]);

  // Reset page when search term changes (but after debounce)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const handleEditContact = (employee: Employee) => {
    setEditingEmployee(employee);
    setContactForm({
      workEmail: employee.workEmail || "",
      personalEmail: employee.personalEmail || "",
      phoneNumber: employee.phoneNumber || "",
    });
    setEditOpen(true);
  };

  const handleViewEmployee = (employee: Employee) => {
    setViewingEmployee(employee);
    fetchEmployeeDetails(employee.id);
    setViewOpen(true);
  };

  const handleSaveContact = async () => {
    if (editingEmployee) {
      try {
        const result = await updateContactMutation.mutateAsync({
          employeeId: editingEmployee.id,
          data: contactForm,
        });

        setEditingEmployee(null);
        setContactForm({ workEmail: "", personalEmail: "", phoneNumber: "" });
        showNotification();

        // Show threat analysis notification if scheduled
        if (result.threatAnalysis?.scheduled) {
          setThreatAnalysisMessage(
            result.threatAnalysis.message || "Threat analysis scheduled"
          );
          setShowThreatAnalysisNotification(true);
          setTimeout(() => setShowThreatAnalysisNotification(false), 5000);
          console.log(
            "Threat analysis scheduled:",
            result.threatAnalysis.message
          );
        }
      } catch (error) {
        console.error("Failed to update contact:", error);
      }
    }
  };



  const handleAddEmployee = () => {
    console.log('handleAddEmployee called');
    console.log('selectedDomainId:', selectedDomainId);
    console.log('employeesData:', employeesData);

    // Get the company ID from the current employeesData
    const companyId = employeesData?.company?.id;
    console.log('companyId from employeesData:', companyId);

    // If no company ID available from employeesData, we need to ensure the user has selected a domain
    // and that domain has employee data loaded
    if (!companyId && !selectedDomainId) {
      alert('Please select a domain first to add employees.');
      return;
    }

    setAddEmployeeForm({
      fullName: "",
      title: "",
      workEmail: "",
      personalEmail: "",
      phoneNumber: "",
      locality: "",
      companyId: companyId ? companyId.toString() : "",
    });
    setShowAddEmployeeModal(true);
    console.log('Modal should be showing now');
  };

  const handleSaveEmployee = async () => {
    console.log('handleAddEmployee called');
    console.log('selectedDomainId:', selectedDomainId);
    console.log('employeesData:', employeesData);
    try {
      const result = await createEmployeeMutation.mutateAsync(addEmployeeForm);


      setShowAddEmployeeModal(false);
      setAddEmployeeForm({
        fullName: "",
        title: "",
        workEmail: "",
        personalEmail: "",
        phoneNumber: "",
        locality: "",
        companyId: companyId ?? 'for-test-handle-employee',
      });
      showNotification();

      // Show threat analysis notification if scheduled
      if (result.threatAnalysis?.scheduled) {
        setThreatAnalysisMessage(
          result.threatAnalysis.message || "Threat analysis scheduled"
        );
        setShowThreatAnalysisNotification(true);
        setTimeout(() => setShowThreatAnalysisNotification(false), 5000);
      }
    } catch (error) {
      console.error("Failed to create employee:", error);
    } finally {
      setAddEmployee(false);
    }
  };

  const handleManualRefresh = () => {
    refetchEmployees();
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(pageInput);
    if (pageNum && pageNum > 0 && pageNum <= (employeesData?.pagination.totalPages || 1)) {
      setCurrentPage(pageNum);
      setPageInput("");
    }
  };

  const handlePageInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGoToPage();
    }
  };

  // Refresh data when jobs complete
  React.useEffect(() => {
    console.log(
      "Job completion effect, threatAnalysisJobs:",
      threatAnalysisJobs
    );
    if (threatAnalysisJobs?.jobs) {
      const activeJobs = threatAnalysisJobs.jobs.filter((job) =>
        ["pending", "processing"].includes(job.status)
      );
      const completedJobs = threatAnalysisJobs.jobs.filter(
        (job) => job.status === "completed"
      );

      if (activeJobs.length === 0 && completedJobs.length > 0) {
        console.log("Jobs completed, refreshing employee data");
        // Refresh employee data silently when no more active jobs
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["employees"] });
        }, 1000);
      }
    }
  }, [threatAnalysisJobs, queryClient]);

  // Use employees directly from API (search is now handled on backend)
  const displayedEmployees = employeesData?.employees || [];

  // malware infection
  const [pageSize, setPageSize] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [exposureType, setExposureType] = useState<'EMPLOYEE'>('EMPLOYEE');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePassword = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const {
    data: exposureData,
    isLoading: exposureLoading,
    error: exposureError,
    refetch
  } = useDomainExposure({
    domainId: selectedDomainId,
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    exposureType,
  });

  const breaches = exposureData?.data || [];
  const pagination = exposureData?.pagination;

  const domainTabs: Tab[] = [
    { name: "Identity theft", count: employeesData?.pagination.total ?? 20 },
    { name: "Malware infections", count: pagination?.totalRecords ?? 10 },
  ];


  if (domainsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <>

      <Modal open={addEmployee} maxWidth="3xl" onClose={setAddEmployee}>
        <ModalHeader onClose={setAddEmployee}>Add New Employee</ModalHeader>
        <ModalBody className="pb-10">
          <form className="grid grid-cols-2 gap-5 mt-2">
            <div className="space-y-5">
              <div>
                <Label htmlFor="full-name" required>Full Name </Label>
                <Input
                  id="full-name"
                  type="text"
                  placeholder="John Doe"
                  value={addEmployeeForm.fullName}
                  onChange={(e) =>
                    setAddEmployeeForm((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="job-title" required>Job Title </Label>
                <Input
                  id="job-title"
                  type="text"
                  placeholder="Software Engineer"
                  value={addEmployeeForm.title}
                  onChange={(e) =>
                    setAddEmployeeForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="work-email" required>Work Email </Label>
                <Input
                  id="work-email"
                  type="text"
                  placeholder="john@company.com"
                  value={addEmployeeForm.workEmail}
                  onChange={(e) =>
                    setAddEmployeeForm((prev) => ({
                      ...prev,
                      workEmail: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <Label htmlFor="personal-email" required>Personal Email </Label>
                <Input
                  id="personal-email"
                  type="text"
                  placeholder="john@gmail.com"
                  value={addEmployeeForm.personalEmail}
                  onChange={(e) =>
                    setAddEmployeeForm((prev) => ({
                      ...prev,
                      personalEmail: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone-num" required>Phone Number </Label>
                <Input
                  id="phone-num"
                  type="text"
                  placeholder="+1234567890"
                  value={addEmployeeForm.phoneNumber}
                  onChange={(e) =>
                    setAddEmployeeForm((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="location" required>Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="New York, NY"
                  value={addEmployeeForm.locality}
                  onChange={(e) =>
                    setAddEmployeeForm((prev) => ({
                      ...prev,
                      locality: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

          </form>
          {(addEmployeeForm.workEmail || addEmployeeForm.personalEmail || addEmployeeForm.phoneNumber) && (
            <div className="mt-4 p-3 bg-p-50 rounded-lg border border-p-200">
              <div className="flex items-start gap-2">
                <ClockIcon className="h-4 w-4 text-p-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-p-800">
                    Threat Analysis Will Be Scheduled
                  </p>
                  <p className="text-xs text-p-600 mt-1">
                    Contact details will be automatically analyzed for security threats
                  </p>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setAddEmployee(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveEmployee}
              disabled={createEmployeeMutation.isPending || !addEmployeeForm.fullName.trim()}

            >
              {createEmployeeMutation.isPending && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {createEmployeeMutation.isPending ? "Adding..." : "Add Employee"}
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal open={addAlertAll} maxWidth="xl" onClose={setAddAlertAll}>
        <ModalHeader onClose={setAddAlertAll}>Alert All Employees</ModalHeader>
        <ModalBody className="relative z-10">
          <ShieldCheckIcon className="absolute top-1/2 left-1/2 -translate-1/2 size-24 -z-10 text-emerald-400/40" />
          <p className="text-sc-600/90">
            Are you sure you want to send an alert to all employees? This action will immediately trigger email notifications to their official work addresses. Please confirm before proceeding, as this message will be distributed organization-wide and may require follow-up communication or action.
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setAddAlertAll(false)}>
              Cancel
            </Button>
            <Button loading={alertAllBtnLoading} type="button" onClick={() => {
              setAlertAllBtnLoading(true);
              setTimeout(() => {
                setAlertAllBtnLoading(false);
                setAddAlertAll(false);
                alert('All alerts sent successfully');
              }, 1000)
            }}>
              Yes, Alert All
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal open={alertOpen} maxWidth="xl" onClose={setAlertOpen}>
        <ModalHeader onClose={setAlertOpen}>Alert Rohan Gupta</ModalHeader>
        <ModalBody>
          <p className="text-sc-700 mb-4">
            Choose how you’d like to alert this employee:
          </p>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="radio" name='alert-email'
              />
              <span>Alert via <b>official email</b></span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio" name='alert-email'
              />
              <span>Alert via <b>personal email</b></span>
            </label>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-end gap-3">

            <Button variant="outline" type="button" onClick={() => setAlertOpen(false)}>
              Cancel
            </Button>
            <Button type="button" loading={alertBtnLoading} onClick={() => {
              setAlertBtnLoading(true);
              setTimeout(() => {
                setAlertBtnLoading(false);
                setAlertOpen(false)
                alert('alert send successfully');
              }, 1000)
            }}>
              Send Alert
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {
        editingEmployee && (
          <Modal open={editOpen} maxWidth="xl" onClose={setEditOpen}>
            <ModalHeader onClose={setEditOpen}>Edit Contact Details</ModalHeader>
            <ModalBody>
              {/* Profile Section */}
              <div className="flex items-center gap-4 bg-linear-to-b from-sc-50 to-sc-100 border border-sc-200 rounded-xl p-4 mb-6">
                {
                  editingEmployee.liAvatar ? (
                    <Image
                      src={editingEmployee.liAvatar}
                      alt={editingEmployee.fullName}
                      width={48}
                      height={48}
                      className="size-12 ring-[0.1em] ring-sc-300 ring-offset-2 ring-offset-white rounded-full border border-sc-200 object-cover"
                    />
                  ) : (
                    <div className="size-12 ring-[0.1em] ring-sc-300 ring-offset-2 ring-offset-white rounded-full object-cover flex items-center justify-center bg-linear-to-b from-sc-50 to-sc-200">
                      <UserIcon className="size-6 text-sc-500/90" />
                    </div>
                  )
                }
                <div>
                  <h3 className="font-semibold text-sc-800">{editingEmployee.fullName}</h3>
                  {editingEmployee.title && (
                    <p className="text-sm text-sc-600/90 font-light">{editingEmployee.title}</p>
                  )}

                </div>
              </div>

              {/* Form Fields */}
              <form className="space-y-4">
                <div>
                  <Label htmlFor="work-email" required>Work Email</Label>
                  <Input
                    id="work-email"
                    type="email"
                    placeholder="work@company.com"
                    value={contactForm.workEmail}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        workEmail: e.target.value,
                      }))
                    } />
                </div>

                <div>
                  <Label htmlFor="personal-email" required>Personal Email</Label>
                  <Input id="personal-email"
                    type="email"
                    placeholder="name@gmail.com"
                    value={contactForm.personalEmail}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        personalEmail: e.target.value,
                      }))
                    } />
                </div>

                <div>
                  <Label htmlFor="phone-number" required>Phone Number</Label>
                  <Input id="phone-number"
                    type="number"
                    placeholder="12234567890"
                    value={contactForm.phoneNumber}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    } />
                </div>



              </form>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveContact}
                  disabled={updateContactMutation.isPending}
                >
                  {updateContactMutation.isPending && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {updateContactMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        )
      }

      {
        viewingEmployee && (
          <Modal open={viewOpen} maxWidth="3xl" onClose={setViewOpen}>
            <ModalHeader onClose={setViewOpen}>Employee Details & Threat Profile</ModalHeader>
            <ModalBody>
              <div className="md:flex md:items-center md:justify-between md:space-x-5v">
                <div className="flex items-start space-x-5 pt-2 pb-7 border-b border-b-sc-200 w-full">
                  <div className="shrink-0">
                    <div className="relative">
                      {
                        viewingEmployee.liAvatar ? (
                          <Image
                            alt={viewingEmployee.fullName}
                            src={viewingEmployee.liAvatar}
                            width={48}
                            height={48}
                            className="size-12 ring-[0.1em] ring-offset-4 ring-sc-300 rounded-full"
                          />
                        ) : (
                          <div className="size-12 rounded-full bg-linear-to-b from-sc-50 to-sc-200 flex items-center justify-center  transition-colors ring-[0.1em] ring-sc-300/85 ring-offset-3">
                            <UserIcon className="size-7 text-sc-500/80" />
                          </div>
                        )
                      }

                      <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                    </div>
                  </div>

                  <div className="">
                    <div className="flex gap-4 items-center">
                      <h2 className="text-2xl/8 font-bold text-sc-900">{viewingEmployee.fullName}</h2>

                      {viewingEmployee.threatSummary && (
                        <div className=" flex flex-row gap-2 items-center">
                          <Badge variant={viewingEmployee.threatSummary.overallThreatLevel === 'CRITICAL' || viewingEmployee.threatSummary.overallThreatLevel === 'High' ? 'error' : viewingEmployee.threatSummary.overallThreatLevel === 'MEDIUM' ? 'warning' : 'primary'} className="capitalize">
                            {getThreatIcon(viewingEmployee.threatSummary.overallThreatLevel)}
                            {viewingEmployee.threatSummary.overallThreatLevel}
                          </Badge>
                          <span className=" ring-1 ring-inset ring-sc-300/80 px-3 py-1 bg-linear-to-b from-sc-50 to-sc-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-sc-600/90">
                            {viewingEmployee.threatSummary.totalExposures} Exposure
                          </span>
                        </div>
                      )}

                    </div>
                    <span className="text-sm/5  text-sc-600/90 font-light">
                      {viewingEmployee.title && (
                        <span className="text-sc-700 font-medium">{viewingEmployee.title}</span>
                      )}  |  {viewingEmployee.headline && (
                        viewingEmployee.headline
                      )}
                    </span>
                    <div className="flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                      {viewingEmployee.workEmail && (
                        <span className="mt-2 flex items-center text-sm text-sc-600/90 font-light">
                          <EnvelopeIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-sc-400" />
                          {viewingEmployee.workEmail}
                        </span>
                      )}
                      {
                        viewingEmployee.phoneNumber && (
                          <span className="mt-2 flex items-center text-sm text-sc-600/90 font-light">
                            <PhoneIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-sc-400" />
                            {viewingEmployee.phoneNumber}
                          </span>
                        )
                      }
                      {
                        viewingEmployee.locality && (
                          <span className="mt-2 flex items-center text-sm text-sc-600/90 font-light">
                            <MapPinIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-sc-400" />
                            {viewingEmployee.locality}
                          </span>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              {
                !viewingEmployee.threatSummary && (
                  <div className="mb-8 p-6 bg-sc-50 rounded-lg text-center">
                    <ShieldExclamationIcon className="h-12 w-12 text-sc-400 mx-auto mb-2" />
                    <p className="text-sc-600/90 font-light">No threat data available</p>
                    <Button variant="primary" className="m-auto mt-6 mb-3">
                      Start Threat Analysis
                    </Button>
                  </div>
                )
              }
              {
                viewingEmployee.threatProfiles &&
                viewingEmployee.threatProfiles.length > 0 && (
                  <>
                    <div className="mt-3">
                      <h2 className="text-xl/7 font-semibold text-sc-900">Detailed Threat Profiles</h2>
                      <p className="text-sm/5 font-light text-sc-600/90">Comprehensive overview of data breach exposure.</p>
                    </div>

                    {
                      viewingEmployee.threatProfiles.map((profile) => (
                        <div key={profile.id} className="mt-3 ring-1 w-full ring-inset ring-sc-300 px-5 py-4 rounded-xl bg-sc-50">

                          <Badge variant={profile.threatLevel === 'CRITICAL' || profile.threatLevel === 'HIGH' ? 'error' : profile.threatLevel === 'MEDIUM' ? 'warning' : 'success'} className="w-max">
                            {getThreatIcon(profile.threatLevel)}
                            {profile.threatLevel}
                          </Badge>

                          <h2 className="mt-2 font-semibold text-lg capitalize"> {profile.searchType.replace("_", " ")}{" "}
                            Analysis</h2>
                          <span className="text-sm/5 font-medium text-p-500 ">{profile.searchValue}</span>

                          <div className="mt-4 flex flex-row gap-3 flex-wrap">
                            <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Status : <span className={`font-semibold ${profile.status === "COMPLETED"
                              ? "text-emerald-500"
                              : "text-amber-500"} `}> {profile.status}</span> </span>
                            <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Exposures : <span className="font-semibold text-sc-900"> {profile.exposuresCount}</span> </span>
                            <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Last Scanned : <span className="font-semibold text-sc-900"> {new Date(
                              profile.lastScanned
                            ).toLocaleDateString()}</span> </span>
                            <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Databases : <span className="font-semibold text-sc-900"> {profile.numOfDatabases}</span> </span>
                            <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Total Results : <span className="font-semibold text-sc-900"> {profile.numOfResults}</span> </span>
                          </div>

                          {profile.recentExposures &&
                            profile.recentExposures.length > 0 ? (
                            <div className="mt-6">
                              <h3 className="font-semibold flex gap-2 items-center">
                                <ShieldCheckIcon className="size-6 text-sc-500" />
                                Recent Data Exposures ({profile.recentExposures.length})</h3>

                              {profile.recentExposures.map((exposure) => (
                                <Accordian className="mt-3" key={exposure.id}>
                                  <AccordianHeader>
                                    <div className="flex gap-4">
                                      <Badge size="auto" className="p-2.5 h-max rounded-xl!">
                                        <UserIcon className="size-6 text-p-500" />
                                      </Badge>
                                      <div>
                                        <h3 className="font-bold text-lg text-left">
                                          {exposure.databaseName}</h3>
                                        <div className="mt-1 flex gap-2">
                                          <Badge>
                                            {exposure.numOfResults} record
                                            {exposure.numOfResults !== 1
                                              ? "s"
                                              : ""}
                                          </Badge>

                                          <span className="text-sm text-sc-600/90 font-light">Database Breach</span>
                                        </div>
                                      </div>
                                    </div>
                                  </AccordianHeader>
                                  <AccordianBody>
                                    {
                                      exposure.infoLeak &&
                                      exposure.infoLeak !==
                                      "No results found" && (
                                        <p className="text-sc-500  text-sm">
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: exposure.infoLeak.replace(
                                                /<\/?em>/g,
                                                ""
                                              ),
                                            }}
                                          />
                                        </p>
                                      )
                                    }

                                    {
                                      exposure.exposureData &&
                                        exposure.exposureData.length > 0 ? (
                                        <div>
                                          <div className="px-4 sm:px-0 mt-5">
                                            <h3 className="text-base/7 font-semibold text-sc-900">Exposed Data Fields</h3>
                                            <p className=" max-w-2xl text-sm/5 text-sc-500">Compromised details are listed below.</p>
                                          </div>
                                          <div className="mt-4 border-t border-sc-200/80">
                                            {
                                              exposure.exposureData.map((
                                                dataRecord: Record<string, unknown>,
                                                recordIndex: number
                                              ) => (
                                                Object.keys(dataRecord).length >
                                                  0 ? (
                                                  <dl key={recordIndex} className="divide-y divide-sc-200/80">
                                                    {Object.entries(dataRecord).map(([key, value]) => (
                                                      <div key={key} className="even:bg-white odd:bg-sc-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                                                        <dt className="text-sm/6 font-medium text-sc-900">{key
                                                          .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                          )
                                                          .replace(
                                                            /^./,
                                                            (str) =>
                                                              str.toUpperCase()
                                                          )}</dt>
                                                        <dd className="mt-1 text-sm/6 text-sc-700 sm:col-span-2 sm:mt-0 truncate">{value
                                                          ? String(value)
                                                          : "N/A"}</dd>
                                                      </div>
                                                    ))}


                                                  </dl>
                                                ) : (
                                                  <p className="text-sm text-sc-600/90 font-light mt-5">
                                                    No specific data details
                                                    available
                                                  </p>
                                                )

                                              ))
                                            }

                                          </div>
                                        </div>
                                      ) : (
                                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                          <p className="text-sm text-green-700">
                                            <span className="font-medium">
                                              Good news:
                                            </span>{" "}
                                            No data exposures found for this search.
                                          </p>
                                        </div>
                                      )
                                    }

                                  </AccordianBody>
                                </Accordian>
                              ))

                              }

                            </div>
                          ) : (
                            <div className="bg-green-50 rounded-lg p-6 text-center border border-green-200">
                              <CheckCircleIcon className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                              <p className="text-sm text-emerald-700 font-medium">
                                No exposures found
                              </p>
                              <p className="text-xs text-emerald-600 mt-1">
                                This contact method appears to be secure
                              </p>
                            </div>
                          )

                          }

                        </div>
                      ))
                    }


                  </>
                )
              }
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setViewOpen(false)}>
                  Cancel
                </Button>
                <Button type="button">
                  Download
                </Button>
              </div>
            </ModalFooter>
          </Modal >
        )
      }

      <div className="mb-3">
        <Title>Employees Leaked Data</Title>
        <Intro>
          Check Identity Theft and Malware Infection data in tabular format
        </Intro>
      </div>

      <div>
        <Tabs
          tabs={domainTabs.map((t) => ({
            ...t,
            current: t.name === activeTab,
          }))}
          onTabChange={handleTabChange}
        />



        <div className="mt-7 min-h-[380px] relative">
          {isLoading && <TableSkeleton />}

          {/* TAB 1 */}
          {!isLoading && activeTab === "Identity theft" && (
            <TableStructure  >
              <div className="px-6 pb-5 border-b border-b-sc-200 ">
                <div className="flex justify-between items-center ">
                  <h1 className="text-xl font-bold"> Employees Monitoring</h1>

                  <div className="flex items-center gap-2">

                    <Button variant='outline' onClick={() => setAddEmployee(true)}>
                      <UserPlusIcon className="size-4 scale-110 text-sc-500/80" /> Add employee
                    </Button>

                    <Button onClick={() => setAddAlertAll(true)}>
                      <BellAlertIcon className="size-4 scale-115" strokeWidth="1.8" /> Alert all
                    </Button>


                  </div>
                </div>
                <div className="mt-3 flex justify-between">
                  <SearchBox
                    placeholder="Search employees..."
                    formClassName="flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <div className="flex items-center gap-3">
                    <SimpleSelect
                      value={selectedDomainId}
                      onChange={(e) => setSelectedDomainId(e.target.value)}
                      disabled={domainsLoading}
                    >
                      <option value="">Select Domain</option>
                      {domains?.map((domain) => (
                        <option key={domain.id} value={domain.id}>
                          {`${domain.domain}${domain.isMain ? " (Main)" : ""}`}
                        </option>
                      ))}
                    </SimpleSelect>
                    <SelectDropdown
                      value={selected}
                      onChange={setSelected}
                    >
                      {employeeType.map((person) => (
                        <DropdownOption key={person.id} value={person} />
                      ))}
                    </SelectDropdown>
                  </div>
                </div>
              </div>

              <ul>
                {
                  displayedEmployees.length > 0 ? (
                    displayedEmployees.map((employee) => (
                      <li key={employee.id} className="w-full mx-auto space-y-8 px-8 py-7 transition border-b border-b-sc-200 odd:bg-sc-50">
                        <div className="flex items-center justify-between">
                          {/* Profile & Details */}
                          <div className="flex items-start gap-4">
                            <div className="relative ">
                              {
                                employee.liAvatar ? (
                                  <Image
                                    src={employee.liAvatar}
                                    alt={employee.fullName}
                                    width={44}
                                    height={44}
                                    className="size-11 rounded-full object-cover ring-[0.1em] ring-sc-300/85 ring-offset-3"
                                  />
                                ) : (
                                  <div className="size-11 rounded-full bg-linear-to-b from-sc-50 to-sc-200 flex items-center justify-center group-hover:from-sc-200 group-hover:to-sc-300 transition-colors ring-[0.1em] ring-sc-300/85 ring-offset-3">
                                    <UserIcon className="size-6 text-sc-500/80" />
                                  </div>
                                )
                              }


                              {employee.threatSummary && employee.threatSummary.overallThreatLevel === "CRITICAL" && (
                                <Badge size="auto" variant="error" className="absolute -top-5 -right-3 size-7">
                                  <ShieldAlert className="size-4 text-red-600" />
                                </Badge>
                              )}

                              {employee.threatSummary && employee.threatSummary.overallThreatLevel === "MEDIUM" && (
                                <Badge size="auto" variant="warning" className="absolute -top-5 -right-3 size-7">
                                  <AlertTriangle className="size-4 text-amber-600" />
                                </Badge>
                              )}

                            </div>

                            <div className="flex-1">
                              <div className="flex flex-row gap-3 items-center">
                                <h2 className="text-lg/8 font-bold text-sc-900 ">
                                  {employee.fullName}</h2>
                                {employee.threatSummary && employee.threatSummary.overallThreatLevel === "CRITICAL" && (
                                  <div className=" flex flex-row gap-2 items-center">
                                    <Badge variant="error">
                                      <ShieldAlert className="size-3.5" />
                                      Critical
                                    </Badge>
                                    <Badge variant="secondary">
                                      {employee.threatSummary.totalExposures} Exposure
                                    </Badge>
                                  </div>
                                )}
                                {employee.threatSummary && employee.threatSummary.overallThreatLevel === "MEDIUM" && (
                                  <div className="flex flex-row gap-2 items-center">
                                    <Badge variant="warning">
                                      <AlertTriangle className="size-3.5" />
                                      Medium
                                    </Badge>
                                    <Badge variant="secondary">
                                      {employee.threatSummary.totalExposures} Exposure
                                    </Badge>
                                  </div>
                                )}

                              </div>

                              {
                                employee.title && (
                                  <p className="font-semibold text-sc-700 text-sm">{employee.title}</p>
                                )
                              }

                              {employee.headline && (
                                <p className="font-light text-sc-600/90 text-sm">{employee.headline}</p>
                              )}


                              {/* Contact Info */}
                              <div className="flex flex-row gap-4 mt-1">
                                {employee.locality && (
                                  <span className="flex items-center gap-1.5 font-light text-sc-600/90 text-sm">
                                    <MapPinIcon className="size-4 text-sc-500/80" />
                                    {employee.locality}
                                  </span>

                                )}

                                {employee.phoneNumber && (
                                  <span className="flex items-center gap-1.5 font-light text-sc-600/90 text-sm">
                                    <PhoneIcon className="size-4 text-sc-500/80" />
                                    {employee.phoneNumber}
                                  </span>
                                )}

                                {employee.workEmail && (
                                  <span className="flex items-center gap-1.5 font-light text-sc-600/90 text-sm">
                                    <EnvelopeIcon className="size-4 text-sc-500/80" />
                                    {employee.workEmail}
                                  </span>
                                )}

                              </div>
                            </div>
                          </div>


                          <div className="flex items-center gap-3">
                            <Button onClick={() => handleViewEmployee(employee)} variant="outline" size='sm' >
                              <EyeIcon className="size-4 text-sc-500/80 scale-95" /> View
                            </Button>

                            <Button onClick={() => handleEditContact(employee)} variant="outline" size='sm' >
                              <PencilSquareIcon className="size-4 text-sc-500/80 scale-95" /> Edit
                            </Button>

                            <Button variant="primary" size="sm" onClick={() => setAlertOpen(true)} >
                              <BellIcon className="scale-105 size-4" strokeWidth={1.8} /> Alert
                            </Button>

                          </div>
                        </div>
                      </li>
                    ))
                  ) : employeesLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                      <p className="mt-2 text-sm text-sc-500">Loading employees...</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <UserIcon className="mx-auto h-12 w-12 text-sc-400" />
                      <h3 className="mt-2 text-sm font-medium text-sc-900">
                        No employees found
                      </h3>
                      <p className="mt-1 text-sm text-sc-500">
                        {searchTerm
                          ? "Try adjusting your search criteria."
                          : selectedDomainId
                            ? "No employees available for the selected domain."
                            : "Please select a domain to view employees."}
                      </p>
                    </div>
                  )
                }
              </ul>

              {
                employeesData?.pagination &&
                employeesData.pagination.totalPages > 1 && (
                  <TablePagination
                    currentPage={currentPage}
                    totalPages={employeesData.pagination.totalPages}
                    totalResults={employeesData.pagination.total}
                    onPageChange={setCurrentPage}
                    resLength={20}
                  />
                )
              }

            </TableStructure>
          )}

          {/* TAB 2 */}
          {!isLoading && activeTab === "Malware infections" && (
            <>
              {exposureLoading && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                      <p className="text-gray-600 text-lg">Loading breach intelligence data...</p>
                    </div>
                  </div>
                </div>
              )}

              {
                !exposureLoading && selectedDomainId && breaches.length > 0 ? (
                  <TableStructure className="mt-7">
                    <h1 className="text-xl font-bold mb-5 px-6"> Malware Infection </h1>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead >Email</TableHead>
                          <TableHead>Password</TableHead>
                          <TableHead >Url</TableHead>
                          <TableHead >Detection date</TableHead>
                          <TableHead >Action</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {breaches.map((credential: ExposureCredential) => (
                          <TableRow key={credential.id}>

                            <TableCell className="text-sc-600/90">
                              {credential.username}
                            </TableCell>

                            <TableCell className="text-sc-600/90">
                              <div className="flex items-center gap-2 text-sc-600/90">
                                {visiblePasswords[credential.id]
                                  ? credential.password || "—"
                                  : "•••••••••••"
                                }

                                <button
                                  onClick={() => togglePassword(credential.id)}
                                  className="text-sc-400 hover:text-sc-500 cursor-pointer"
                                >
                                  {visiblePasswords[credential.id]
                                    ? <EyeSlashIcon className="size-4" />
                                    : <EyeIcon className="size-4" />
                                  }
                                </button>
                              </div>
                            </TableCell>

                            <TableCell className="text-sc-600/90">
                              {credential.url ? (
                                <div className='flex items-center gap-1'>
                                  <ExternalLink size={14} className='text-sc-600/80' />
                                  <a
                                    href={credential.url}
                                    target="_blank"
                                    className="rounded-full text-xs font-medium text-sc-600/90 hover:text-p-500 underline cursor-pointer block w-[30ch] truncate px-0.5"
                                  >
                                    {credential.url}
                                  </a>
                                </div>
                              ) : "—"}
                            </TableCell>


                            <TableCell>
                              <span className="px-3 py-1 rounded-full text-xs font-medium">
                                {credential.createdAt ? credential.createdAt : '-'}
                              </span>
                            </TableCell>

                            <TableCell>
                              <button
                                className={`
                          px-3 py-1 rounded-full text-xs font-medium cursor-pointer bg-sc-200 text-sc-600`}
                              >
                                resolve
                              </button>
                            </TableCell>

                          </TableRow>
                        ))}
                      </TableBody>



                      <TableFooter>
                        <tr>
                          <td colSpan={7}>
                            <TablePagination
                              currentPage={currentPage}
                              totalPages={pagination?.totalPages || 1}
                              totalResults={pagination?.totalRecords}
                              onPageChange={setCurrentPage}
                              resLength={10}
                            />
                          </td>
                        </tr>
                      </TableFooter>
                    </Table>
                  </TableStructure>
                ) : !exposureLoading && selectedDomainId ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                    <div className="text-center">
                      <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No breach data found</h3>
                      <p className="text-gray-500">
                        No breach data available for this domain at the moment.
                      </p>
                    </div>
                  </div>
                ) : null
              }


            </>
          )}
        </div>


      </div>
    </>
  );
};

export default Domain;
