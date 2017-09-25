namespace VanillaJs.Controllers.Api
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;

    [Route("/api/values")]
    public class ValuesController : Controller
    {
        [HttpGet("")]
        public IActionResult All()
        {
            var res = new List<int> { 1, 2, 3};
            return this.Json(res);
        }
    }
}