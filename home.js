const Home={template:`

<div class="container">
  <form class="d-flex flex-row justify-content-around align-items-center">
    <div class="p-2 mb-3">
      <label class="form-label">Fecha Desde</label>
      <input type="date" v-model="startDate" class="form-control" name="fechaDesde" placeholder="dd/mm/aaaa" required>
    </div>

    <div class="p-2 mb-3">
      <label class="form-label">Fecha Hasta</label>
      <input type="date" v-model="endDate" class="form-control" name="fechaHasta" placeholder="dd/mm/aaaa" required>
    </div>

    <div class="p-2 form-group">
      <button type="submit" @click.prevent="submitForm" class="btn btn-success">Aceptar</button>
    </div>
  </form>

  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Vendedor</th>
        <th scope="col">Monto de Ventas</th>
        <th scope="col">Comisión por Ventas</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="res in resultados">
        <td>{{res[0]}}</td>
        <td>{{res[1]}}</td>
        <td>{{res[2]}}</td>
      </tr>
    </tbody>
  </table>
</div>


`,

data(){
    return{
        resultados:[],
        startDate:'',
        endDate:'',
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"Reporte/Resultado")
        .then((response)=>{
            this.resultados=response.data;
        })
    },
    submitForm(){
        console.log(this.startDate)
        console.log(this.endDate)
        axios.get(variables.API_URL+"Reporte/Resultado",{
            params:{
                fechaDesde: this.startDate,
                fechaHasta: this.endDate
            }
        })
        .then((response)=>{
            this.resultados=response.data;
        })
    }
},
mounted:function(){
    this.refreshData();
}
}