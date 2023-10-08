'use client';

import { Box, FormLabel, Input, } from "@mui/material";
import React from "react";
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import './styles.css'

interface LatinhaFormProps {
  register: UseFormRegister<{ 
  Sku: number;
  TotalPlan: number;
  descricao: string; 
}>;
}

const LatinhaForm = ({register}:LatinhaFormProps) => {



  return (
    <Box>
        <FormLabel htmlFor="Sku"
        >
          Sku:
        </FormLabel>
        <input
          id="Sku"
          className="inputText"
          placeholder="Sku"
          type="number"
          {...register('Sku')}
        />
        <FormLabel htmlFor="descricao">
          Descrição:
        </FormLabel>
        <input
          id="descricao"
          className="inputText"
          placeholder="Descrição"
          type="text"
          {...register('descricao')}
        />
        <FormLabel htmlFor="TotalPlan">
          Total Planejado(TON):
        </FormLabel>
        <input
          id="TotalPlan"
          className="inputText"
          placeholder="Total Planejado"
          type="number"
          {...register('TotalPlan')}
        />

      
    </Box>
  )
};

export default LatinhaForm;