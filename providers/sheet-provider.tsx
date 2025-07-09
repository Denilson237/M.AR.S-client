"use client"

import { useMountedState } from "react-use";

import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";

import { NewRequestSheet } from "@/features/transactions/components/new-request-sheet";
import { EditRequestSheet } from "@/features/transactions/components/edit-request-sheet";
import { ViewRequestSheet } from "@/features/transactions/components/view-request-sheet";
import { OpenRequestForValidationSheet } from "@/features/transactions/components/open-request-for-validation-sheet";

import { BrouillardSheet } from "@/features/transactions/components/brouillard-sheet";
import { NewUserSheet } from "@/modules/users/components/new-user-sheet";
import { EditUserSheet } from "@/modules/users/components/edit-user-sheet";
import { NewAssignmentRequestSheet } from "@/features/requests/components/new-assignment-request-sheet";
import NewUnAssignmentRequestSheet from "@/features/requests/components/unassignment-request-sheet";
import { OpenRequestForAssignationSheet } from "@/features/transactions/components/open-request-for-assignation-sheet";
import { OpenTicketForValidationSheet } from "@/modules/tickets/ui/components/open-ticket-for-validation-sheet";


export const SheetProvider = () => {
    const isMounted = useMountedState();

    if (!isMounted) return null;

    return (
        <>
            <OpenTicketForValidationSheet />
            <NewCategorySheet />
            <EditCategorySheet />
            <NewUserSheet />
            <EditUserSheet />
            <NewAssignmentRequestSheet />
            <NewUnAssignmentRequestSheet />
            <NewRequestSheet />
            <EditRequestSheet />
            <ViewRequestSheet />
            <OpenRequestForValidationSheet />
            <OpenRequestForAssignationSheet />
            <BrouillardSheet />
        </>
    )

}