"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type CreateRoleFormValues,
  createRoleSchema,
} from "@/validations/role.validation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createRole } from "@/services/role";
import { TRoleFeature } from "@/types/auth.types";
import { PulseLoader } from "react-spinners";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import Link from "next/link";
import { DashboardWrapper } from "../../_components/DashboardWrapper";
import { RoleFeatures } from "@/constant/roleFeatures/index";

const CreateRole = () => {
  const [features, setFeatures] = useState(RoleFeatures);
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateRoleFormValues>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      roleName: "",
      features: RoleFeatures.map((feature: TRoleFeature) => ({
        ...feature,
      })),
    },
  });

  const handleFeatureCheck = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].isChecked = !updatedFeatures[index].isChecked;

    setFeatures(updatedFeatures);
    form.setValue(
      "features",
      updatedFeatures.map((feature) => ({
        ...feature,
        isChecked: feature.isChecked ?? false,
      }))
    );
  };

  const selectedFeaturesCount = features.filter(
    (feature) => feature.isChecked
  ).length;

  const onSubmit = async (data: CreateRoleFormValues) => {
    const selectedFeatures = data.features
      .filter((feature) => feature.isChecked)
      .map((feature) => ({
        name: feature.name,
        index: feature.index,
        path: feature.path,
      }));

    const payload = {
      name: data.roleName,
      roleFeature: selectedFeatures,
    };

    startTransition(async () => {
      const result = await createRole(payload);

      if (result?.statusCode === 201) {
        showSuccessToast(result.message || "Role created successfully");
        form.reset({
          roleName: "",
          features: RoleFeatures.map((feature: TRoleFeature) => ({
            ...feature,
            isChecked: false,
          })),
        });
        setFeatures(
          RoleFeatures.map((feature: TRoleFeature) => ({
            ...feature,
            isChecked: false,
          }))
        );
      } else {
        showErrorToast(result?.message || "Failed to create role");
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardWrapper>
        <Link href={"/dashboard/role"}>
          <div className="mb-6">
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Roles
            </Button>
          </div>
        </Link>
        
        <div className="mx-auto w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="rounded-lg bg-brand/20 p-8">
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
                    {features.map(
                      (feature: TRoleFeature, featureIndex: number) => (
                        <div
                          key={feature.index}
                          className={`transition-colors ${
                            feature.isChecked
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
                                        feature.isChecked
                                          ? "cursor-pointer"
                                          : "cursor-pointer "
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
                      )
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset({
                      roleName: "",
                      features: RoleFeatures.map((feature: TRoleFeature) => ({
                        ...feature,
                        isChecked: false,
                      })),
                    });
                    setFeatures(
                      RoleFeatures.map((feature: TRoleFeature) => ({
                        ...feature,
                        isChecked: false,
                      }))
                    );
                  }}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  className="bg-brand hover:bg-brand/80 transition duration-200 cursor-pointer"
                >
                  {isPending ? <PulseLoader color="#ffffff" /> : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default CreateRole;
