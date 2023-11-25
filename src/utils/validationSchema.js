// src/utils/validationSchema.js

import * as yup from 'yup';

const validationSchema = yup.object().shape({
  titulo: yup.string().required('O campo título é obrigatório'),
  salario: yup.number().required('O campo salário é obrigatório'),
  local: yup.string().required('O campo local é obrigatório'),
  empresa: yup.string().required('O campo empresa é obrigatório'),
  tecnologia: yup.string().required('O campo tecnologia é obrigatório'),
});

export default validationSchema;
