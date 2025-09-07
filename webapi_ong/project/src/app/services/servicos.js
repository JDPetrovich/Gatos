import { InicialService } from "./inicial-service.js";
import { HealthCheckService } from "./health-check-service.js";

const Servico = {
    INICIAL: InicialService,
    HEALTH_CHECK: HealthCheckService,
};

export default Servico;