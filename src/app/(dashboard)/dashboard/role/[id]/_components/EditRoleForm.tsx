/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { updateRole } from "@/services/role";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { DashboardWrapper } from "../../../_components/DashboardWrapper";
import { RoleFeatures } from "@/constant/roleFeatures/index";

export default function EditRoleForm({
    roleData,
    id,
}: {
    roleData: any;
    id: string;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    // Merge role features with all available features to show checked status
    const initialFeatures = RoleFeatures.map((feature) => ({
        ...feature,
        isChecked: roleData.roleFeature.some(
            (roleFeature: any) => roleFeature.name === feature.name
        ),
    }));

    const [features, setFeatures] = useState(initialFeatures);
    const selectedFeaturesCount = features.filter(
        (feature) => feature.isChecked
    ).length;

    const form = useForm({
        defaultValues: {
            roleName: roleData.name,
            features: initialFeatures,
        },
    });

    const handleFeatureCheck = (index: number) => {
        const updatedFeatures = [...features];
        updatedFeatures[index].isChecked = !updatedFeatures[index].isChecked;
        setFeatures(updatedFeatures);
        form.setValue("features", updatedFeatures);
    };

    const onSubmit = async (data: any) => {
        const selectedFeatures = data.features
            .filter((feature: any) => feature.isChecked)
            .map((feature: any) => ({
                name: feature.name,
                index: feature.index,
                path: feature.path,
            }));

        const payload = {
            name: data.roleName,
            roleFeature: selectedFeatures,
        };

        startTransition(async () => {
            const result = await updateRole(id, payload);
            if (result?.statusCode === 200) {
                showSuccessToast(result.message);
                router.push("/dashboard/role");
            } else {
                showErrorToast(result?.message);
            }
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <DashboardWrapper>
                <div className="max-w-5xl mx-auto">
                    {/* Header showing which role is being edited */}
                    <div className="mb-6 pb-4 border-b">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Role: <span className="text-primary">{roleData.name}</span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Modify role permissions and settings
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                            <div className="rounded-lg bg-slate-50 p-8">
                                <FormField
                                    control={form.control}
                                    name="roleName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">
                                                Role Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter role name"
                                                    className="max-w-md bg-white"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Feature Permissions</h2>
                                    <Badge
                                        variant="outline"
                                        className="bg-primary/5 px-3 py-1 text-primary"
                                    >
                                        {selectedFeaturesCount} selected
                                    </Badge>
                                </div>

                                <div className="rounded-lg border border-slate-200">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-y">
                                        {features.map((feature: any, featureIndex: number) => (
                                            <div
                                                key={feature.index}
                                                className={`transition-colors ${feature.isChecked
                                                        ? "bg-primary/5"
                                                        : "hover:bg-slate-50"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between p-4">
                                                    <FormField
                                                        control={form.control}
                                                        name={`features.${featureIndex}.isChecked`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex w-full items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={() =>
                                                                            handleFeatureCheck(featureIndex)
                                                                        }
                                                                        className={
                                                                            feature.isChecked ? "border-primary" : ""
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                <div className="flex-1">
                                                                    <FormLabel className="text-base font-medium">
                                                                        {feature.name}
                                                                    </FormLabel>
                                                                    {feature.path && (
                                                                        <p className="text-sm text-muted-foreground">
                                                                            {feature.path}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                {feature.isChecked && (
                                                                    <Check className="h-5 w-5 text-primary" />
                                                                )}
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            <div className="flex justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/dashboard/role")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className="bg-brand hover:bg-brand/80 transition duration-200 cursor-pointer"
                                >
                                    {isPending ? <PulseLoader color="#ffffff" /> : "Update"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DashboardWrapper>
        </div>
    );
}
